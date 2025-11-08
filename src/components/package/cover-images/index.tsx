import React, { useState } from 'react';
import styles from './cover-images.module.scss';
import ModalGallery from '../modal-gallery';

interface ImageCardProps {
  title: string;
  imageUrl: string;
  className?: string;
  onClick?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  imageUrl,
  className,
  onClick,
}) => {
  return (
    <div className={`${styles.imageCard} ${className || ''}`} onClick={onClick}>
      <img loading="lazy" decoding="async" src={imageUrl} alt={title} />
      <div className={styles.overlay}>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </div>
  );
};

const CoverImages: React.FC<{ imagesByCategory: any }> = ({
  imagesByCategory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.coverImages}>
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          <ImageCard
            title={''}
            imageUrl={imagesByCategory?.all[0]}
            className={styles.largeImage}
            onClick={() => {
              setActiveCategory('all')
              openModal()}}
          />

          <div className={styles.smallGrid}>
            {[
              {img: imagesByCategory?.stays[0] , name : 'stays'},
              {img: imagesByCategory?.stays[1] , name : 'stays'},
              {img: imagesByCategory?.activities[0] , name : 'activities'},
              {img: imagesByCategory?.activities[2] , name : 'activities'},
            ]
              .map((category, index) => (
                <ImageCard
                  key={index}
                  title={''}
                  imageUrl={category?.img}
                  className={styles.smallImage}
                  onClick={() => {
                    setActiveCategory(category?.name)
                    openModal()}}
                />
              ))}

            <div className={styles.viewAllCard}>
              <button
                className={styles.viewAllButton}
                onClick={() =>
                  {
                    setActiveCategory('all')
                    openModal()
                  }
                }
              >
                <svg
                  className={styles.icon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                View All Images
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalGallery
        isOpen={isModalOpen}
        onClose={closeModal}
        allbum={imagesByCategory}
        activeCategory={activeCategory}
      />
    </section>
  );
};

export default CoverImages;
