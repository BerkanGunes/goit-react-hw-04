import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => (
  <div className={styles.card} onClick={onClick}>
    <img
      src={image.urls.small}
      alt={image.alt_description || 'Image'}
      className={styles.image}
      loading="lazy"
    />
  </div>
);

export default ImageCard; 