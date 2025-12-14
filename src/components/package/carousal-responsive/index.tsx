import { useState, useEffect, useRef } from 'react';
import './index.scss';
import FullScreenCarousel from '../corousal';


interface CarouselProps {
  images: string[];
  dayNumber?: number;
  title?: string;
}

const CarouselResponsive = ({ images, dayNumber, title }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const hasInitialized = useRef(false);

  if (!images || images.length === 0) return null;

  const showControls = images.length > 1;

  useEffect(() => {
    if (!showControls || isPaused) return;

    const delay = hasInitialized.current ? 0 : Math.random() * 3000;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      hasInitialized.current = true;
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [images.length, isPaused, showControls]);

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
      <div
        className="carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="carousel">
          <div className="carousel-inner">
            {images.map((slide: string, index: number) => (
              <div
                key={`${slide}-${index}`}
                className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
              >
                <div className="slide-content">
                  <img src={slide} alt={`Slide ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Day Info Overlay (Bottom Left) */}
          {/* {dayNumber && (
            <div className="day-info-overlay">
              <span className="day-number">Day {dayNumber}</span>
              {title && <span className="day-title">{title}</span>}
            </div>
          )} */}

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </button>

              <button
                className="carousel-button next-button"
                onClick={goToNext}
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
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
