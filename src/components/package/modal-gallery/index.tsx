import { useEffect, useState } from 'react';
import styles from './modal-gallery.module.scss';
import FullScreenCarousel from '../corousal';
import Skeleton from '../../common/Skeleton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  allbum: any;
  activeCategory: string;
}

const ModalGallery: React.FC<ModalProps> = ({ isOpen, onClose, allbum, activeCategory }) => {
  const [activeCategoryChosen, setActiveCategoryChosen] = useState<string>('all');
  const [images, setImages] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [corousalImgIndex, setCorousalImgIndex] = useState<number | undefined>(undefined);
  const [loadedImages, setLoadedImages] = useState(
    new Array(images.length).fill(false)
  );

  const openModal = (index: number) => {
    setCorousalImgIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setActiveCategoryChosen(activeCategory);
  }, [isOpen, activeCategory]);

  useEffect(() => {
    setLoadedImages(new Array(images.length).fill(false));
    if (activeCategoryChosen === 'all') {
      setImages(allbum?.all);
    } else if (activeCategoryChosen === 'stays') {
      setImages(allbum?.stays);
    } else if (activeCategoryChosen === 'activities') {
      setImages(allbum?.activities);
    }
  }, [activeCategoryChosen, allbum])

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

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
              color: activeCategoryChosen === 'all' ? '#000' : '#888',
              cursor: 'pointer',
            }}
            onClick={() => {
              setActiveCategoryChosen('all');
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
                  color: activeCategoryChosen === categorykey.toLowerCase() ? '#000' : '#888',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setActiveCategoryChosen(categorykey.toLowerCase());
                  if (categorykey.toLowerCase() === 'stays') {
                    setImages(allbum?.stays);
                  } else if (categorykey.toLowerCase() === 'activities') {
                    setImages(allbum?.activities);
                  } else {
                    setImages(allbum?.all);
                  }
                }}
              >
                {categorykey}{' '}
                {categorykey.toLowerCase() === 'stays'
                  ? `(${allbum?.stays.length})`
                  : categorykey.toLowerCase() === 'activities'
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
              {!loadedImages[index] && (
                <Skeleton
                  width="100%"
                  height="100%"
                  borderRadius="8px"
                  className='style.modalImageSkelton'
                />
              )}
              <img
                loading="lazy"
                decoding="async"
                className={styles.modalImage}
                src={image}
                alt=""
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageLoad(index)}
                style={{
                  opacity: loadedImages[index] ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out"
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {
        corousalImgIndex !== undefined && (
          <FullScreenCarousel
            images={images}
            imgIndex={corousalImgIndex}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )
      }
    </div>
  );
};

export default ModalGallery;
