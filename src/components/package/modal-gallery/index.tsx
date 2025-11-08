import { useEffect, useState } from 'react';
import styles from './modal-gallery.module.scss';
import FullScreenCarousel from '../corousal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  allbum: any;
  activeCategory: string;
}

const ModalGallery: React.FC<ModalProps> = ({ isOpen, onClose, allbum,activeCategory }) => {
  const [activeCategoryChosen, setActiveCategoryChosen] = useState<string>('all');
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
    setActiveCategoryChosen(activeCategory);
  }, [isOpen,activeCategory]);

  useEffect(()=>{
    if(activeCategoryChosen === 'all'){
      setImages(allbum?.all);
    }else if(activeCategoryChosen === 'stays'){
      setImages(allbum?.stays);
    }else if(activeCategoryChosen === 'activities'){
      setImages(allbum?.activities);
    }
  },[activeCategoryChosen])

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
        images={images}
        imgIndex={corousalImgIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ModalGallery;
