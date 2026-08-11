import validator from 'validator';
import Enquiry from '../models/Enquiry.js';
import mongoose from 'mongoose';

const clean = (value) => validator.escape(String(value || '').trim());

export const createEnquiry = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected. Please set MONGO_URI in backend/.env.'
      });
    }

    const payload = {
      name: clean(req.body.name),
      phone: clean(req.body.phone),
      email: String(req.body.email || '').trim().toLowerCase(),
      course: clean(req.body.course),
      message: clean(req.body.message)
    };

    const errors = [];
    if (!payload.name) errors.push('Name is required.');
    if (!/^[6-9]\d{9}$/.test(payload.phone.replace(/\D/g, '').slice(-10))) errors.push('Valid phone number is required.');
    if (!validator.isEmail(payload.email)) errors.push('Valid email is required.');
    if (!payload.course) errors.push('Course is required.');
    if (!payload.message) errors.push('Message is required.');

    if (errors.length) {
      return res.status(400).json({ success: false, message: 'Validation failed.', errors });
    }

    const enquiry = await Enquiry.create(payload);
    res.status(201).json({ success: true, message: 'Enquiry submitted successfully.', data: enquiry });
  } catch (error) {
    next(error);
  }
};
