import React from 'react';
import { useState } from 'react';
import { FaEnvelope, FaLocationDot, FaPhone, FaWhatsapp } from 'react-icons/fa6';
import SEO from '../components/SEO';
import { submitEnquiry } from '../api';
import { academyConfig, imagePlaceholders } from '../data/config';
import { courses } from '../data/courses';

const initialForm = { name: '', phone: '', email: '', course: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required.';
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10))) next.phone = 'Enter a valid 10-digit Indian phone number.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.course) next.course = 'Please choose a course.';
    if (!form.message.trim()) next.message = 'Message is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      await submitEnquiry(form);
      setStatus('Thank you. Your enquiry has been submitted successfully.');
      setForm(initialForm);
    } catch {
      setStatus('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const setField = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  return (
    <>
      <SEO title="Contact Defence Academy | Join Physical Training" description="Contact Moti sir defence academy for physical training admission, WhatsApp enquiry and academy location." />
      <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(11,31,51,.88), rgba(17,17,17,.55)), url(${imagePlaceholders.ground})` }}>
        <p className="eyebrow">Contact</p>
        <h1>Join Physical Training</h1>
        <p>Send an enquiry or chat directly on WhatsApp.</p>
      </section>
      <section className="section contact-layout">
        <div className="contact-info reveal">
          <h2>Contact Information</h2>
          <p><FaLocationDot /> <span><strong>Academy Address</strong>{academyConfig.address}</span></p>
          <p><FaPhone /> <span><strong>Phone</strong>{academyConfig.phone}</span></p>
          <p><FaWhatsapp /> <span><strong>WhatsApp</strong>{academyConfig.whatsappNumber}</span></p>
          <p><FaEnvelope /> <span><strong>Email</strong>{academyConfig.email}</span></p>
          <div className="hours">
            <strong>Training Hours</strong>
            <span>{academyConfig.trainingHours.days}</span>
            <span>Morning: {academyConfig.trainingHours.morning}</span>
            <span>Evening: {academyConfig.trainingHours.evening}</span>
          </div>
        </div>

        <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
          <h2>Submit Enquiry</h2>
          <label>Full Name<input value={form.name} onChange={(e) => setField('name', e.target.value)} /></label>
          {errors.name ? <small>{errors.name}</small> : null}
          <label>Phone Number<input value={form.phone} onChange={(e) => setField('phone', e.target.value)} /></label>
          {errors.phone ? <small>{errors.phone}</small> : null}
          <label>Email<input type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} /></label>
          {errors.email ? <small>{errors.email}</small> : null}
          <label>Course Interested In
            <select value={form.course} onChange={(e) => setField('course', e.target.value)}>
              <option value="">Select course</option>
              {courses.map((course) => <option key={course.slug} value={course.title}>{course.title}</option>)}
            </select>
          </label>
          {errors.course ? <small>{errors.course}</small> : null}
          <label>Message<textarea rows="5" value={form.message} onChange={(e) => setField('message', e.target.value)} /></label>
          {errors.message ? <small>{errors.message}</small> : null}
          <button className="btn btn--gold" type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Enquiry'}</button>
          {status ? <p className="form-status">{status}</p> : null}
        </form>
      </section>
      <section className="section section--light">
        <div className="section-head">
          <p className="eyebrow">Location</p>
          <h2>Find Our Academy</h2>
        </div>
        <div className="map-box">
          <iframe title="Academy location map" src={academyConfig.googleMapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="center"><a className="btn btn--dark" href={academyConfig.googleDirectionsUrl} target="_blank" rel="noreferrer">Get Directions</a></div>
      </section>
    </>
  );
};

export default Contact;
