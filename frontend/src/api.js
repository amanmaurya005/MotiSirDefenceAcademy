import axios from 'axios';
import { courses } from './data/courses';
import { galleryItems } from './data/siteData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 8000
});

export const fetchCourses = async () => {
  try {
    const response = await api.get('/api/courses');
    return response.data.data;
  } catch {
    return courses;
  }
};

export const fetchCourse = async (slug) => {
  try {
    const response = await api.get(`/api/courses/${slug}`);
    return response.data.data;
  } catch {
    return courses.find((course) => course.slug === slug);
  }
};

export const fetchGallery = async () => {
  try {
    const response = await api.get('/api/gallery');
    return response.data.data?.length ? response.data.data : galleryItems;
  } catch {
    return galleryItems;
  }
};

export const submitEnquiry = async (payload) => {
  const response = await api.post('/api/enquiries', payload);
  return response.data;
};
