import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const { CLOUDINARY_CLOUD_NAME: cloudName, CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret } = process.env;
const folder = process.env.CLOUDINARY_GALLERY_FOLDER || 'achievements';
const uploadDirectory = join(process.cwd(), 'uploads', 'achievements');
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error('Cloudinary credentials are not configured.');
}

const getExistingPublicIds = async () => {
  const url = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`);
  url.searchParams.set('prefix', `${folder}/`);
  url.searchParams.set('max_results', '500');

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`
    }
  });

  if (!response.ok) {
    throw new Error(`Unable to check existing Cloudinary images (${response.status}): ${await response.text()}`);
  }

  const payload = await response.json();
  return new Set((payload.resources || []).map((resource) => resource.public_id));
};

const uploadImage = async (filename, existingPublicIds) => {
  const extension = extname(filename).toLowerCase();
  const imageName = basename(filename, extension)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const publicId = `${folder}/${imageName}`;

  if (existingPublicIds.has(publicId)) {
    return 'skipped';
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const tags = 'Achievements';
  const signatureText = `public_id=${publicId}&tags=${tags}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash('sha1').update(signatureText).digest('hex');
  const mimeType = extension === '.png' ? 'image/png' : extension === '.webp' ? 'image/webp' : 'image/jpeg';
  const form = new FormData();

  form.append('file', new Blob([await readFile(join(uploadDirectory, filename))], { type: mimeType }), filename);
  form.append('api_key', apiKey);
  form.append('timestamp', String(timestamp));
  form.append('public_id', publicId);
  form.append('tags', tags);
  form.append('signature', signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(`${filename}: ${payload.error?.message || `upload failed (${response.status})`}`);
  }

  existingPublicIds.add(publicId);
  return 'uploaded';
};

const filenames = (await readdir(uploadDirectory))
  .filter((filename) => supportedExtensions.has(extname(filename).toLowerCase()));
const existingPublicIds = await getExistingPublicIds();
let uploaded = 0;
let skipped = 0;
const failures = [];

for (const filename of filenames) {
  try {
    const result = await uploadImage(filename, existingPublicIds);
    if (result === 'uploaded') {
      uploaded += 1;
      console.log(`Uploaded ${filename}`);
    } else {
      skipped += 1;
      console.log(`Already present: ${filename}`);
    }
  } catch (error) {
    failures.push(error.message);
    console.error(`Failed ${error.message}`);
  }
}

console.log(`Finished: ${uploaded} uploaded, ${skipped} already present, ${failures.length} failed, ${filenames.length} local images found.`);

if (failures.length) {
  process.exitCode = 1;
}
