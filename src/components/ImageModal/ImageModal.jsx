import Modal from 'react-modal';
import { useEffect } from 'react';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ image, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      contentLabel="Image Modal"
    >
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <div className={styles.imageContainer} onClick={e => e.stopPropagation()}>
        <img
          src={image.urls.regular}
          alt={image.alt_description || 'Image'}
          className={styles.modalImage}
        />
      </div>
    </Modal>
  );
};

export default ImageModal; 