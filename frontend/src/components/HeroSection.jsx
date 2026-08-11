import React from 'react';
import { Link } from 'react-router-dom';
import { academyConfig, imagePlaceholders } from '../data/config';

const HeroSection = () => (
  <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(11,31,51,.88), rgba(11,17,17,.58)), url(${imagePlaceholders.hero})` }}>
    <div className="hero__content reveal">
      <p className="eyebrow">{academyConfig.tagline}</p>
      <h1>Train Hard. Stay Disciplined. Serve the Nation.</h1>
      <p>Professional physical training and defence preparation for Army, Navy, Air Force, Police, SI, Constable, Head Constable, Group D and other competitive physical examinations.</p>
      <div className="hero__actions">
        <Link className="btn btn--gold" to="/contact">Join Our Academy</Link>
        <Link className="btn btn--light" to="/courses">Explore Courses</Link>
      </div>
    </div>
  </section>
);

export default HeroSection;
