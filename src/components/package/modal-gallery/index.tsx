import { useEffect, useState } from 'react';
import styles from './modal-gallery.module.scss';
import FullScreenCarousel from '../corousal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  allbum: any;
}

const ModalGallery: React.FC<ModalProps> = ({ isOpen, onClose, allbum }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [images, setImages] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [corousalImgIndex, setCorousalImgIndex] = useState(0);

  const openModal = (index: number) => {
    setCorousalImgIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setActiveCategory('all');
    setImages(allbum?.all);
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
              setImages(allbum?.all);
            }}
          >
            All Images ({allbum?.all?.length})
          </h2>
          {['Stays', 'Activities'].map((categorykey: any) => {
            return (
              <h2
                className={styles.modalTitle}
                style={{
                  color: activeCategory === categorykey ? '#000' : '#888',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setActiveCategory(categorykey.toLowerCase());
                  if (categorykey === 'Stays') {
                    setImages(allbum?.stays);
                  } else if (categorykey === 'Activities') {
                    setImages(allbum?.activities);
                  } else {
                    setImages(allbum?.all);
                  }
                }}
              >
                {categorykey}{' '}
                {categorykey === 'Stays'
                  ? `(${allbum?.stays.length})`
                  : categorykey === 'Activities'
                  ? `(${allbum?.activities.length})`
                  : `(${allbum?.all.length})`}
              </h2>
            );
          })}
        </div>
        <div className={styles.modalImages}>
          {images.map((image: any, index: any) => (
            <div
              key={index}
              className={styles.modalImage}
              onClick={() => {
                openModal(index);
              }}
            >
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
      <FullScreenCarousel
        images={
          activeCategory === 'stays'
            ? allbum?.stays
            : activeCategory === 'activities'
            ? allbum?.activities
            : allbum?.all
        }
        imgIndex={corousalImgIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ModalGallery;
