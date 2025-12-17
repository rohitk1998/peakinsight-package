import { useState, useEffect, useRef } from 'react';
import './index.scss';
import FullScreenCarousel from '../corousal';


interface CarouselProps {
  images: string[];
}

const CarouselResponsive = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const hasInitialized = useRef(false);

  const safeImages = images || [];
  const showControls = safeImages.length > 1;

  useEffect(() => {
    if (!showControls || isPaused) return;

    const delay = hasInitialized.current ? 0 : Math.random() * 3000;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      hasInitialized.current = true;
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === safeImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [safeImages.length, isPaused, showControls]);

  if (safeImages.length === 0) return null;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? safeImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === safeImages.length - 1 ? 0 : prevIndex + 1
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
            {safeImages.map((slide: string, index: number) => (
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

          {/* Stories View (Bottom Right) */}
          {safeImages.length > 1 && (
            <div className="stories-container">
              {safeImages.slice(0, 3).map((img, idx) => (
                <div key={idx} className="story-thumbnail" onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}>
                  <img src={img} alt={`Story ${idx + 1}`} />
                  {idx === 2 && safeImages.length > 3 && (
                    <div className="more-overlay">+{safeImages.length - 3}</div>
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
                {safeImages.map((_: string, index: number) => (
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
        images={safeImages}
        imgIndex={currentIndex}
      />
    </>
  );
};

export default CarouselResponsive;
