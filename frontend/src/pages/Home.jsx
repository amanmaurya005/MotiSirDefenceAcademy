import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import CourseCard from '../components/CourseCard';
import SEO from '../components/SEO';
import { academyConfig, imagePlaceholders } from '../data/config';
import { courses } from '../data/courses';
import { achievements, activities, features, galleryItems, stats, testimonials } from '../data/siteData';

const Home = () => (
  <>
    <SEO title="Defence Academy | Physical Training for Army, Navy, Air Force & Police" description="Moti sir defence academy offers disciplined physical training for Army, Navy, Air Force, Police and government recruitment aspirants." />
    <HeroSection />

    <section className="section split">
      <div className="reveal">
        <p className="eyebrow">About Academy</p>
        <h2>Build Your Strength. Prepare for Your Future.</h2>
        <p>{academyConfig.academyName} provides structured physical training and guidance for students preparing for defence and government recruitment examinations.</p>
        <ul className="check-list">
          {['Experienced trainers', 'Daily physical training', 'Running practice', 'Strength & endurance training', 'Discipline & routine', 'Exam-oriented preparation', 'Regular fitness assessment', 'Individual guidance'].map((item) => <li key={item}>{item}</li>)}
        </ul>
        <Link className="btn btn--dark" to="/about">Know More About Us</Link>
      </div>
      <img className="section-image reveal" src={imagePlaceholders.academy} alt="Students training at academy" loading="lazy" />
    </section>

    <section className="section section--light">
      <div className="section-head">
        <p className="eyebrow">Programs</p>
        <h2>Our Training Programs</h2>
      </div>
      <div className="grid grid--4">
        {courses.map((course) => <CourseCard key={course.slug} course={course} />)}
      </div>
    </section>

    <section className="section">
      <div className="section-head">
        <p className="eyebrow">Why Choose Us</p>
        <h2>Why Choose Our Academy?</h2>
      </div>
      <div className="grid grid--3">
        {features.map(({ icon: Icon, title, text }) => (
          <article className="feature reveal" key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="section section--light">
      <div className="section-head">
        <p className="eyebrow">Training Activities</p>
        <h2>Practice That Builds Selection Readiness</h2>
      </div>
      <div className="activity-grid">
        {activities.map((activity) => (
          <article className="activity-card reveal" key={activity.title}>
            <img src={activity.image} alt={activity.title} loading="lazy" />
            <span>{activity.title}</span>
          </article>
        ))}
      </div>
    </section>

    <section className="stats" aria-label="Academy statistics">
      {stats.map((stat) => (
        <div key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </section>

    <section className="section">
      <div className="section-head">
        <p className="eyebrow">Results</p>
        <h2>Our Students. Our Pride.</h2>
      </div>
      <div className="grid grid--4">
        {achievements.map((student) => (
          <article className="card success-card reveal" key={student.name}>
            <img src={student.image} alt={student.name} loading="lazy" />
            <div className="card__body">
              <h3>{student.name}</h3>
              <p>{student.exam}</p>
              <strong>{student.achievement} - {student.year}</strong>
            </div>
          </article>
        ))}
      </div>
      <div className="section-head section-head--small">
        <h2>What Our Students Say</h2>
      </div>
      <div className="grid grid--3">
        {testimonials.map((item) => (
          <blockquote className="testimonial reveal" key={item.name}>
            <p>“{item.text}”</p>
            <cite>{item.name}</cite>
          </blockquote>
        ))}
      </div>
    </section>

    <section className="section section--light">
      <div className="section-head">
        <p className="eyebrow">Gallery</p>
        <h2>Training Ground Moments</h2>
      </div>
      <div className="gallery-grid">
        {galleryItems.slice(0, 6).map((item) => (
          <Link className="gallery-card reveal" key={item.title} to="/gallery">
            <img src={item.image} alt={item.title} loading="lazy" />
            <span>{item.category}</span>
            <strong>{item.title}</strong>
          </Link>
        ))}
      </div>
      <div className="center"><Link className="btn btn--dark" to="/gallery">View Full Gallery</Link></div>
    </section>

    <section className="cta">
      <h2>Your Selection Starts With Your Preparation.</h2>
      <p>Start your physical preparation with disciplined training, expert guidance and a focused environment.</p>
      <div>
        <Link className="btn btn--gold" to="/contact">Join Now</Link>
        <Link className="btn btn--light" to="/contact">Contact Us</Link>
      </div>
    </section>
  </>
);

export default Home;
