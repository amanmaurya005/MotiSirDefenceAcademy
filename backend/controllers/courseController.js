import Course from '../models/Course.js';
import { demoCourses } from '../data/demoCourses.js';
import mongoose from 'mongoose';

export const getCourses = async (_req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: demoCourses });
    }

    const count = await Course.countDocuments();
    if (count === 0) {
      await Course.insertMany(demoCourses);
    }

    const courses = await Course.find().sort({ createdAt: 1 });
    res.json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
};

export const getCourseBySlug = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const demoCourse = demoCourses.find((course) => course.slug === req.params.slug.toLowerCase());
      if (!demoCourse) {
        return res.status(404).json({ success: false, message: 'Course not found.' });
      }
      return res.json({ success: true, data: demoCourse });
    }

    const course = await Course.findOne({ slug: req.params.slug.toLowerCase() });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};
