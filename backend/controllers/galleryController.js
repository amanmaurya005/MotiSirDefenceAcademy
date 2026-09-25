import { getCloudinaryImages } from '../services/cloudinaryService.js';

export const getGalleryImages = async (_req, res, next) => {
  try {
    const images = await getCloudinaryImages();
    res.json({ success: true, data: images });
  } catch (error) {
    next(error);
  }
};
