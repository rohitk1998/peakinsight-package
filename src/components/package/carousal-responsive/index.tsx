import { useState } from 'react';
import './index.scss';
import FullScreenCarousel from '../corousal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
  dayNumber?: number;
  title?: string;
}

const CarouselResponsive = ({ images, dayNumber, title }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const showControls = images.length > 1;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="carousel-container" >
        <div className="carousel">
          <div
            className="carousel-inner"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((slide: string, index: number) => (
              <div key={`${slide}-${index}`} className="carousel-slide">
                <div className="slide-content">
                  <img src={slide} alt={`Slide ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Day Info Overlay (Bottom Left) */}
          {dayNumber && (
            <div className="day-info-overlay">
              <span className="day-number">Day {dayNumber}</span>
              {title && <span className="day-title">{title}</span>}
            </div>
          )}

          {/* Stories View (Bottom Right) */}
          {images.length > 1 && (
            <div className="stories-container">
              {images.slice(0, 3).map((img, idx) => (
                <div key={idx} className="story-thumbnail" onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}>
                  <img src={img} alt={`Story ${idx + 1}`} />
                  {idx === 2 && images.length > 3 && (
                    <div className="more-overlay">+{images.length - 3}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {showControls && (
            <>
              <button
                className="carousel-button prev-button"
                onClick={goToPrevious}
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className="carousel-button next-button"
                onClick={goToNext}
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>

              <div className="carousel-indicators">
                {images.map((_: string, index: number) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={(e) => goToSlide(index, e)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <FullScreenCarousel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        imgIndex={currentIndex}
      />
    </>
  );
};

export default CarouselResponsive;
