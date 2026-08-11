import React from 'react';
import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import SEO from '../components/SEO';
import { fetchCourses } from '../api';
import { imagePlaceholders } from '../data/config';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses().then(setCourses).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Defence Academy Courses | Army, Navy, Air Force & Police Training" description="Explore physical training programs for Army, Navy, Air Force, Police, SI, Constable, Group D and other exams." />
      <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(11,31,51,.88), rgba(17,17,17,.55)), url(${imagePlaceholders.running})` }}>
        <p className="eyebrow">Courses</p>
        <h1>Defence & Government Physical Training Programs</h1>
        <p>Choose a focused program and start preparing with structure.</p>
      </section>
      <section className="section section--light">
        {loading ? <p className="status">Loading courses...</p> : null}
        {!loading && courses.length === 0 ? <p className="status">No courses available right now.</p> : null}
        <div className="grid grid--3">
          {courses.map((course) => <CourseCard key={course.slug} course={course} detailed />)}
        </div>
      </section>
    </>
  );
};

export default Courses;
