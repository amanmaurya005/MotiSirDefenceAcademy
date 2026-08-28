import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  course: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  emailNotificationStatus: {
    type: String,
    enum: ['pending', 'sent', 'skipped', 'failed'],
    default: 'pending'
  },
  emailNotificationError: { type: String, trim: true },
  notifiedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Enquiry', EnquirySchema);
