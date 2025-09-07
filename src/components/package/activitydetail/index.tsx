import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ChevronDown } from "lucide-react";
import "./accordian.scss";
import styles from "./image-crausal.module.scss"

interface AccordionProps {
  items: any[];
}

const ActivityDetail: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handlePrevious = (arr : any ) => {
    setCurrentImageIndex((prevIndex: number) =>
      prevIndex === 0 ? arr?.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (arr : any ) => {
    setCurrentImageIndex((prevIndex: number) =>
      prevIndex === arr.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const getVisibleDots = (arr:any) => {
    if (!arr || arr.length <= 3) {
      return arr.map((_:any, index:number) => index);
    }

    const totalImages = arr.length;
    if (currentImageIndex === 0) {
      return [0, 1, 2];
    } else if (currentImageIndex === totalImages - 1) {
      return [totalImages - 3, totalImages - 2, totalImages - 1];
    } else {
      return [currentImageIndex - 1, currentImageIndex, currentImageIndex + 1];
    }
  };

  return (
    <div className="accordion">
      <label style={{ fontSize: '16px', fontWeight: 'normal',color: '#2f4858' }}>
          Activities
        </label>
      <div>
      {items.map((item, index) => (
        <div className="accordion-item" key={index}>
          <button
            className={`accordion-header ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => toggleItem(index)}
          >
            <span>{item.activityName}</span>
            <ChevronDown
              className={`icon ${activeIndex === index ? "rotate" : ""}`}
              size={20}
            />
          </button>
          <div
            className={`accordion-content ${
              activeIndex === index ? "open" : ""
            }`}
          >
            <p>{item.description}</p>
            <div className={styles.imagesSection}>
          <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
              {item?.images?.length > 1 && (
                <button
                  className={styles.carouselButton1}
                  onClick={()=>handlePrevious(item?.images)}
                  aria-label="Previous image"
                >
                  <ArrowLeftIcon width={30} height={30} />
                </button>
              )}

              <div className={styles.imageContainer}>
                <div
                  className={styles.imageSlider}
                  style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                  }}
                >
                  {item?.images.map((image: any, index: number) => (
                    <div key={index} className={styles.imageSlide}>
                      <img
                        src={image.imageUrl}
                        alt={`Day`}
                        className={styles.carouselImage}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {item?.images?.length > 1 && (
                <button
                  className={styles.carouselButton}
                  onClick={()=> handleNext(item?.images)}
                  aria-label="Next image"
                >
                  <ArrowRightIcon width={30} height={30} />
                </button>
              )}
            </div>

            {item?.images?.length > 1 && (
              <div className={styles.carouselDots}>
                {getVisibleDots(item?.images).map((dotIndex: number) => (
                  <button
                    key={dotIndex}
                    className={`${styles.dot} ${
                      currentImageIndex === dotIndex ? styles.activeDot : ''
                    }`}
                    onClick={() => handleDotClick(dotIndex)}
                    aria-label={`Go to image ${dotIndex + 1}`}
                  />
                ))}
              </div>
            )}
            <div className={styles.autoPlayIndicator}>
              <div
                className={`${styles.autoPlayBar}`}
                style={{ animationDuration: '4000ms' }}
              />
            </div>
          </div>
        </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ActivityDetail;
