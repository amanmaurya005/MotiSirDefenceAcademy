import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => (
  <section className="section not-found">
    <SEO title="Page Not Found | Moti sir defence academy" description="The requested page was not found." />
    <h1>404</h1>
    <p>The page you are looking for is not available.</p>
    <Link className="btn btn--dark" to="/">Back to Home</Link>
  </section>
);

export default NotFound;
