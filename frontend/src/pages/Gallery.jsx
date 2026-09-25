import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay, FaXmark } from 'react-icons/fa6';
import { fetchGallery } from '../api';
import GalleryCard from '../components/GalleryCard';
import SEO from '../components/SEO';
import { imagePlaceholders } from '../data/config';
import { galleryItems, videos } from '../data/siteData';

const categories = ['All', 'Training', 'Running', 'Students', 'Events', 'Ground', 'Achievements'];

const Gallery = () => {
  const [category, setCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(null);
  const [items, setItems] = useState(galleryItems);
  const filtered = useMemo(() => category === 'All' ? items : items.filter((item) => item.category === category), [category, items]);
  const active = activeIndex !== null ? filtered[activeIndex] : null;

  const move = (step) => setActiveIndex((index) => (index + step + filtered.length) % filtered.length);

  useEffect(() => {
    let isMounted = true;

    fetchGallery().then((images) => {
      if (isMounted) {
        setItems(images);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setActiveIndex(null);
  }, [category]);

  return (
    <>
      <SEO title="Gallery | Defence Academy" description="View training, running, student, ground, event and achievement gallery for Moti sir defence academy." />
      <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(11,31,51,.88), rgba(17,17,17,.55)), url(${imagePlaceholders.students})` }}>
        <p className="eyebrow">Gallery</p>
        <h1>Training, Ground & Achievement Moments</h1>
      </section>
      <section className="section section--light">
        <div className="filter-row" role="tablist" aria-label="Gallery categories">
          {categories.map((item) => (
            <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} type="button">{item}</button>
          ))}
        </div>
        <div className="gallery-grid">
          {filtered.map((item, index) => <GalleryCard key={item.id || item.title} item={item} onClick={() => setActiveIndex(index)} />)}
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Videos</p>
          <h2>Academy Videos</h2>
        </div>
        <div className="grid grid--3">
          {videos.map((video) => (
            <a className="video-card reveal" href={video.url} target="_blank" rel="noreferrer" key={video.title}>
              <img src={video.thumbnail} alt={video.title} loading="lazy" />
              <span><FaPlay /> {video.title}</span>
            </a>
          ))}
        </div>
      </section>

      {active ? (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button className="lightbox__close" onClick={() => setActiveIndex(null)} aria-label="Close"><FaXmark /></button>
          <button className="lightbox__nav" onClick={() => move(-1)} aria-label="Previous"><FaChevronLeft /></button>
          <img src={active.image} alt={active.title} />
          <button className="lightbox__nav" onClick={() => move(1)} aria-label="Next"><FaChevronRight /></button>
          <p>{active.title}</p>
        </div>
      ) : null}
    </>
  );
};

export default Gallery;
