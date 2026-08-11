import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaBars, FaShieldHalved, FaXmark } from 'react-icons/fa6';
import { academyConfig } from '../data/config';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link className="logo" to="/" aria-label={`${academyConfig.academyName} home`}>
        <span className="logo__mark"><FaShieldHalved /></span>
        <span>{academyConfig.academyName}</span>
      </Link>

      <button className="nav-toggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
        {open ? <FaXmark /> : <FaBars />}
      </button>

      <nav className={`nav-links ${open ? 'nav-links--open' : ''}`} aria-label="Main navigation">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {link.label}
          </NavLink>
        ))}
        <Link className="btn btn--gold nav-cta" to="/contact">Join Now</Link>
      </nav>
    </header>
  );
};

export default Navbar;
