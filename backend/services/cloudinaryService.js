const CLOUDINARY_API_BASE = 'https://api.cloudinary.com/v1_1';
const GALLERY_CATEGORIES = ['Training', 'Running', 'Students', 'Events', 'Ground', 'Achievements'];

const titleCase = (value) => value
  .replace(/[-_]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/\b\w/g, (char) => char.toUpperCase());

const getBasicAuthHeader = () => {
  const token = Buffer
    .from(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`)
    .toString('base64');

  return `Basic ${token}`;
};

const inferCategory = (resource) => {
  const tags = Array.isArray(resource.tags) ? resource.tags : [];
  const tagCategory = GALLERY_CATEGORIES.find((category) =>
    tags.some((tag) => tag.toLowerCase() === category.toLowerCase())
  );

  if (tagCategory) {
    return tagCategory;
  }

  const pathParts = resource.public_id.split('/');
  const folderCategory = GALLERY_CATEGORIES.find((category) =>
    pathParts.some((part) => part.toLowerCase() === category.toLowerCase())
  );

  return folderCategory || 'Training';
};

const getContextValue = (resource, key) => resource.context?.custom?.[key] || resource.context?.[key];

const mapCloudinaryResource = (resource) => {
  const publicIdName = resource.public_id.split('/').pop() || resource.public_id;
  const title = getContextValue(resource, 'caption')
    || getContextValue(resource, 'alt')
    || resource.display_name
    || titleCase(publicIdName);

  return {
    id: resource.asset_id || resource.public_id,
    title,
    category: inferCategory(resource),
    image: resource.secure_url,
    publicId: resource.public_id,
    width: resource.width,
    height: resource.height
  };
};

export const getCloudinaryImages = async () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary credentials are not configured.');
  }

  const maxResults = process.env.CLOUDINARY_MAX_RESULTS || '60';
  const galleryFolder = process.env.CLOUDINARY_GALLERY_FOLDER || 'achievements';
  const url = new URL(`${CLOUDINARY_API_BASE}/${CLOUDINARY_CLOUD_NAME}/resources/image/upload`);

  url.searchParams.set('max_results', maxResults);
  url.searchParams.set('tags', 'true');
  url.searchParams.set('context', 'true');

  if (galleryFolder) {
    url.searchParams.set('prefix', galleryFolder);
  }

  const response = await fetch(url, {
    headers: {
      Authorization: getBasicAuthHeader()
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudinary request failed (${response.status}): ${errorText}`);
  }

  const payload = await response.json();
  return (payload.resources || []).map(mapCloudinaryResource);
};
