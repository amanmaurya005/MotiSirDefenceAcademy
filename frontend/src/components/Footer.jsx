import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaShieldHalved, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import { academyConfig } from '../data/config';
import { courses } from '../data/courses';

const Footer = () => (
  <footer className="footer">
    <div className="footer__grid">
      <div>
        <div className="footer__brand"><FaShieldHalved /> {academyConfig.academyName}</div>
        <p>Disciplined physical training for defence, police and government recruitment aspirants.</p>
        <div className="socials">
          <a href={academyConfig.socialLinks.youtube} aria-label="YouTube"><FaYoutube /></a>
          <a href={academyConfig.socialLinks.instagram} aria-label="Instagram"><FaInstagram /></a>
          <a href={academyConfig.socialLinks.whatsapp} aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href={academyConfig.socialLinks.facebook} aria-label="Facebook"><FaFacebook /></a>
        </div>
      </div>
      <div>
        <h3>Quick Links</h3>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div>
        <h3>Courses</h3>
        {courses.map((course) => (
          <Link key={course.slug} to={`/courses/${course.slug}`}>{course.category}</Link>
        ))}
      </div>
      <div>
        <h3>Contact</h3>
        <p>{academyConfig.address}</p>
        <p>{academyConfig.phone}</p>
        <p>{academyConfig.email}</p>
      </div>
    </div>
    <div className="footer__bottom">© 2026 {academyConfig.academyName}. All Rights Reserved.</div>
  </footer>
);

export default Footer;
