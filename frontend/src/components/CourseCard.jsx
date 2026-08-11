import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, detailed = false }) => {
  const Icon = course.icon;
  return (
    <article className="card course-card reveal">
      <img src={course.image} alt={`${course.title} training`} loading="lazy" />
      <div className="card__body">
        <div className="course-card__icon">{Icon ? <Icon /> : null}</div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        {detailed && (
          <div className="course-meta">
            <span><strong>Eligibility:</strong> {course.eligibility}</span>
            <span><strong>Focus:</strong> {course.trainingFocus?.slice(0, 3).join(', ')}</span>
            <span><strong>Duration:</strong> {course.duration}</span>
          </div>
        )}
        <Link className="btn btn--outline" to={`/courses/${course.slug}`}>View Details</Link>
      </div>
    </article>
  );
};

export default CourseCard;
