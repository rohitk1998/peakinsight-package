import { useEffect, useState } from 'react';
import styles from './modal-gallery.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: any;
  destinations: any;
}

const ModalGallery: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  activities,
  destinations,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    setActiveCategory('all');
    setImages([...destinations, ...activities]);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <button className={styles.backButton} onClick={onClose}>
            <svg
              className={styles.backIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Details
          </button>
          <h2
            className={styles.modalTitle}
            style={{
              color: activeCategory === 'all' ? '#000' : '#888',
              cursor: 'pointer',
            }}
            onClick={() => {
              setActiveCategory('all');
              setImages([...destinations, ...activities]);
            }}
          >
            All Images ({[...destinations, ...activities].length})
          </h2>
          {['Destinations', 'Activities'].map((categorykey: any) => {
            return (
              <h2
                className={styles.modalTitle}
                style={{
                  color: activeCategory === categorykey ? '#000' : '#888',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setActiveCategory(categorykey);
                  if (categorykey === 'Destinations') {
                    setImages(destinations);
                  } else {
                    setImages(activities);
                  }
                }}
              >
                {categorykey}{' '}
                {categorykey === 'Destinations'
                  ? `(${destinations.length})`
                  : `(${activities.length})`}
              </h2>
            );
          })}
        </div>
        <div className={styles.modalImages}>
          {images.map((image: any, index: any) => (
            <div key={index} className={styles.modalImage}>
              <img
                loading="lazy"
                decoding="async"
                className={styles.modalImage}
                src={image}
                alt={''}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalGallery;
