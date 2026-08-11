import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    duration: { type: String, default: 'Contact academy' },
    trainingFocus: [{ type: String }],
    eligibility: { type: String, default: 'Contact academy' },
    fee: { type: String, default: 'Contact academy' },
    category: { type: String, required: true },
    whoShouldJoin: { type: String },
    routine: [{ type: String }],
    benefits: [{ type: String }],
    faq: [
      {
        q: String,
        a: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Course', CourseSchema);
