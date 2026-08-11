const GalleryCard = ({ item, onClick }) => (
  <button className="gallery-card reveal" onClick={onClick} type="button">
    <img src={item.image} alt={item.title} loading="lazy" />
    <span>{item.category}</span>
    <strong>{item.title}</strong>
  </button>
);

export default GalleryCard;
