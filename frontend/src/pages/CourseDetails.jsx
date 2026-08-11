import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { fetchCourse } from '../api';

const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse(slug).then(setCourse).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <section className="section"><p className="status">Loading course details...</p></section>;

  if (!course) {
    return (
      <section className="section not-found">
        <h1>Course Not Found</h1>
        <p>The course you are looking for is not available.</p>
        <Link className="btn btn--dark" to="/courses">Back to Courses</Link>
      </section>
    );
  }

  return (
    <>
      <SEO title={`${course.title} | Moti sir defence academy`} description={course.description} />
      <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(11,31,51,.88), rgba(17,17,17,.55)), url(${course.image})` }}>
        <p className="eyebrow">{course.category}</p>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </section>
      <section className="section course-detail">
        <div>
          <h2>Course Description</h2>
          <p>{course.description}</p>
          <h2>Who Should Join</h2>
          <p>{course.whoShouldJoin}</p>
          <h2>Training Activities</h2>
          <ul className="check-list">{course.trainingFocus?.map((item) => <li key={item}>{item}</li>)}</ul>
          <h2>Daily Routine</h2>
          <ul className="check-list">{course.routine?.map((item) => <li key={item}>{item}</li>)}</ul>
          <h2>Benefits</h2>
          <ul className="check-list">{course.benefits?.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <aside className="detail-box">
          <h3>Course Information</h3>
          <p><strong>Eligibility:</strong> {course.eligibility}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Fee:</strong> {course.fee}</p>
          <Link className="btn btn--gold" to="/contact">Enquire Now</Link>
        </aside>
      </section>
      <section className="section section--light">
        <div className="section-head"><h2>FAQ</h2></div>
        <div className="faq-list">
          {course.faq?.map((item) => (
            <article className="info-panel" key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default CourseDetails;
