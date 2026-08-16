import React from 'react';
import SEO from '../components/SEO';
import TrainerCard from '../components/TrainerCard';
import { academyConfig, imagePlaceholders } from '../data/config';
import { trainers } from '../data/siteData';

const About = () => (
  <>
    <SEO title="About Us | Defence Academy" description="Learn about the mission, vision and training philosophy of Moti sir defence academy." />
    <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(11,31,51,.88), rgba(17,17,17,.55)), url(${imagePlaceholders.ground})` }}>
      <p className="eyebrow">About Us</p>
      <h1>About Our Academy</h1>
      <p>Discipline, consistency and physical preparation for young aspirants.</p>
    </section>

    <section className="section split">
      <div className="reveal">
        <h2>{academyConfig.academyName}</h2>
        <p>Our academy helps students prepare physically and mentally for Army, Navy, Air Force, Police, SI, Constable, Head Constable, Group D and other government recruitment examinations.</p>
        <p>Training is built around daily routine, practical fitness, controlled intensity and regular assessment so aspirants can improve with clarity and confidence.</p>
      </div>
      <img className="section-image reveal" src={imagePlaceholders.training} alt="Defence academy training" loading="lazy" />
    </section>

    <section className="section section--light">
      <div className="grid grid--2">
        <article className="info-panel reveal">
          <h2>Our Mission</h2>
          <p>To provide disciplined, practical and result-oriented physical training that helps aspirants become stronger, fitter and better prepared for their recruitment journey.</p>
        </article>
        <article className="info-panel reveal">
          <h2>Our Vision</h2>
          <p>To become a trusted training destination for young aspirants preparing for defence and government physical examinations.</p>
        </article>
      </div>
    </section>

    <section className="section">
      <div className="section-head">
        <p className="eyebrow">Philosophy</p>
        <h2>Training Philosophy</h2>
      </div>
      <div className="grid grid--4">
        {['Discipline', 'Consistency', 'Fitness', 'Determination'].map((item) => (
          <article className="feature feature--compact reveal" key={item}><h3>{item}</h3><p>Every session is built to strengthen this habit.</p></article>
        ))}
      </div>
    </section>

    <section className="section section--light">
      <div className="section-head">
        <p className="eyebrow">Trainers</p>
        <h2>Meet Our Trainer</h2>
      </div>
      <div className="grid grid--3">
        {trainers.map((trainer) => <TrainerCard key={trainer.name} trainer={trainer} />)}
      </div>
    </section>
  </>
);

export default About;
