import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './FullScreenCarousel.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: any;
  imgIndex: number | any;
}

const FullScreenCarousel: React.FC<ModalProps> = ({
  images,
  isOpen,
  onClose,
  imgIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState<any>(undefined);
  const [imagesList, setImagesList] = useState([]);


  console.log('imagesList', imagesList);
  console.log('images', images, imgIndex);

  useEffect(() => {
    setCurrentIndex(undefined)
    setImagesList([])
  }, [])

  useEffect(() => {
    setImagesList(images);
    setCurrentIndex(imgIndex)
  }, [images, imgIndex]);



  const goToPrevious = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === undefined ? imagesList.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === imagesList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => onClose()}
        className={styles.closeBtn}
        aria-label="Close"
      >
        <X size={32} />
      </button>

      <div className={styles.counter}>
        {currentIndex + 1} / {imagesList.length}
      </div>

      <button
        onClick={goToPrevious}
        className={styles.prevBtn}
        aria-label="Previous image"
      >
        <ChevronLeft size={40} />
      </button>

      <div className={styles.imageWrapper}>
        <>
          {console.log("asdasdsadsadasdsadas", imagesList[currentIndex])}
        </>
        <img
          src={imagesList[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className={styles.image}
        />
      </div>

      <button
        onClick={goToNext}
        className={styles.nextBtn}
        aria-label="Next image"
      >
        <ChevronRight size={40} />
      </button>
    </div>
  );
};

export default FullScreenCarousel;
