import React from 'react';
const TrainerCard = ({ trainer }) => (
  <article className="card trainer-card reveal">
    <img src={trainer.image} alt={trainer.name} loading="lazy" />
    <div className="card__body">
      <h3>{trainer.name}</h3>
      <p className="muted">{trainer.position}</p>
      <p>{trainer.experience}</p>
      <p>{trainer.specialization}</p>
    </div>
  </article>
);

export default TrainerCard;
