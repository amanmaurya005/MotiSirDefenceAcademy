import { FaClipboardCheck, FaDumbbell, FaPersonRunning, FaRegClock, FaUserCheck, FaUsers } from 'react-icons/fa6';
import { imagePlaceholders } from './config';

export const features = [
  { title: 'Experienced Trainers', text: 'Practical guidance from fitness-focused instructors.', icon: FaUserCheck },
  { title: 'Structured Daily Training', text: 'Clear routines for running, strength and recovery.', icon: FaRegClock },
  { title: 'Defence-Oriented Fitness', text: 'Training aligned with physical recruitment preparation.', icon: FaDumbbell },
  { title: 'Regular Physical Tests', text: 'Demo assessments help students track progress.', icon: FaClipboardCheck },
  { title: 'Personal Guidance', text: 'Individual correction for pacing, form and routine.', icon: FaUsers },
  { title: 'Disciplined Environment', text: 'A focused setting built around consistency.', icon: FaPersonRunning }
];

export const activities = [
  'Running', 'Sprint Training', 'Long Run', 'Push-Ups', 'Sit-Ups', 'Pull-Ups',
  'Endurance Training', 'Strength Training', 'Agility Training', 'Physical Test Practice',
  'Warm-up & Stretching', 'Group Training'
].map((title, index) => ({
  title,
  image: [imagePlaceholders.running, imagePlaceholders.training, imagePlaceholders.students, imagePlaceholders.ground][index % 4]
}));

export const stats = [
  { value: '500+', label: 'Students Trained' },
  { value: '50+', label: 'Successful Selections' },
  { value: '10+', label: 'Years Experience' },
  { value: '20+', label: 'Training Programs' }
];

export const achievements = [
  { name: 'Rahul Sharma', exam: 'Army Recruitment', achievement: 'Selected', year: '2025', image: imagePlaceholders.student },
  { name: 'Amit Kumar', exam: 'Police Constable', achievement: 'Physical Cleared', year: '2025', image: imagePlaceholders.student },
  { name: 'Neha Singh', exam: 'SI Recruitment', achievement: 'Physical Qualified', year: '2024', image: imagePlaceholders.student },
  { name: 'Vikram Yadav', exam: 'Navy Recruitment', achievement: 'Fitness Stage Cleared', year: '2024', image: imagePlaceholders.student }
];

export const testimonials = [
  { name: 'Sandeep', text: 'The daily routine helped me become consistent and confident for my physical test.' },
  { name: 'Pooja', text: 'Trainers corrected my running technique and kept every session disciplined.' },
  { name: 'Manish', text: 'The academy environment feels serious, focused and motivating.' }
];

export const trainers = [
  { name: 'Captain Training Coach', position: 'Physical Training Instructor', experience: '8+ Years Experience', specialization: 'Running, endurance and discipline drills', image: imagePlaceholders.trainer },
  { name: 'Fitness Coach Arjun', position: 'Strength & Conditioning Coach', experience: '6+ Years Experience', specialization: 'Strength, agility and bodyweight training', image: imagePlaceholders.trainer },
  { name: 'Coach Priya Sharma', position: 'Student Fitness Mentor', experience: '5+ Years Experience', specialization: 'Beginner fitness and progress tracking', image: imagePlaceholders.trainer }
];

export const galleryItems = [
  { title: 'Morning Training', category: 'Training', image: imagePlaceholders.training },
  { title: 'Running Batch', category: 'Running', image: imagePlaceholders.running },
  { title: 'Student Practice', category: 'Students', image: imagePlaceholders.students },
  { title: 'Academy Ground', category: 'Ground', image: imagePlaceholders.ground },
  { title: 'Fitness Event', category: 'Events', image: imagePlaceholders.events },
  { title: 'Achievement Day', category: 'Achievements', image: imagePlaceholders.achievements },
  { title: 'Strength Drill', category: 'Training', image: imagePlaceholders.training },
  { title: 'Long Run Session', category: 'Running', image: imagePlaceholders.running },
  { title: 'Group Practice', category: 'Students', image: imagePlaceholders.students }
];

export const videos = [
  {
    title: 'Morning Physical Training',
    thumbnail: imagePlaceholders.training,
    url: 'https://www.youtube.com/'
  },
  {
    title: 'Running Practice Session',
    thumbnail: imagePlaceholders.running,
    url: 'https://www.youtube.com/'
  },
  {
    title: 'Group Strength Training',
    thumbnail: imagePlaceholders.students,
    url: 'https://www.youtube.com/'
  }
];
