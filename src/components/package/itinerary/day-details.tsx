import React, { useState } from 'react';
import styles from './day-details.module.scss';
import { ArrowLeftIcon, ArrowRightIcon,CarFront,MapPin,Clock } from 'lucide-react';
import ActivityDetail from '../activitydetail';

interface DayDetailsProps {
  dayData: {
    dayNumber: number;
    dayTitle: string;
    dayDescription: string;
    mealPlanType: string;
    destination: string;
    stayType: string;
    isTravelDay: boolean;
    travelFrom?: string;
    travelTo?: string;
    travelMode?: string;
    durationHours?: number;
    distanceKm?: number;
    hasActivities: boolean;
    images: Array<{
      id: string | null;
      position: number;
      imageUrl: string;
      originalFileName: string | null;
    }>;
    activities: Array<{
      id: number;
      position: number;
      activityType: string;
      activityName: string;
      description: string;
      images: Array<{
        id: string | null;
        position: number;
        imageUrl: string;
        originalFileName: string | null;
      }>;
    }>;
  };
}

const DayDetails: React.FC<DayDetailsProps> = ({ dayData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex: number) =>
      prevIndex === 0 ? dayData.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex: number) =>
      prevIndex === dayData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const getVisibleDots = () => {
    if (!dayData.images || dayData.images.length <= 3) {
      return dayData.images.map((_, index) => index);
    }

    const totalImages = dayData.images.length;
    if (currentImageIndex === 0) {
      return [0, 1, 2];
    } else if (currentImageIndex === totalImages - 1) {
      return [totalImages - 3, totalImages - 2, totalImages - 1];
    } else {
      return [currentImageIndex - 1, currentImageIndex, currentImageIndex + 1];
    }
  };

  return (
    <div className={styles.dayDetailsContainer}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h3 className={styles.dayTitle}>{dayData.dayTitle}</h3>
           <div className={styles.badges}>
          <span className={styles.mealBadge}>{dayData.mealPlanType}</span>
          <span className={styles.stayBadge}>{dayData.stayType}</span>
          {dayData.isTravelDay && (
            <span className={styles.travelBadge}>Travel Day</span>
          )}
        </div>
        <hr className={styles.divider} />
          <p className={styles.dayDescription}>{dayData.dayDescription}</p>
        </div>

       
      </div>

      <label style={{ fontSize: '16px', fontWeight: 'normal',color: '#2f4858' }}>
          Transfers
        </label>

      {dayData.isTravelDay && (
        <div className={styles.travelCard}>
          <div className={styles.transferType}>
            <div style={{
              display:"flex",
              alignItems:"center",
              justifyContent:"start"
            }}>
            <CarFront size={18}/>
            <span className={styles.transferText}>
              Transfer in {dayData.travelMode || 'Sedan, SUV or similar'}
            </span>
              </div>
              <span className={styles.duration}><Clock size={16}/> {dayData.durationHours}h</span>
              <span className={styles.distance}><MapPin size={16} /> {dayData.distanceKm}km</span>
          </div>
          <div className={styles.routeSection}>
            <div className={styles.routeItem}>
              <div className={styles.routeLabel}>From</div>
              <div className={styles.routeLocation}>
                <svg
                  className={styles.locationIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{dayData.travelFrom}</span>
              </div>
            </div>

            <div className={styles.viewStops}>
            </div>

            <div className={styles.routeItem}>
              <div className={styles.routeLabel}>To</div>
              <div className={styles.routeLocation}>
                <svg
                  className={styles.locationIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{dayData.travelTo}</span>
              </div>
            </div>
          </div>
        </div>
      )}
<label style={{ fontSize: '16px', fontWeight: 'normal',color: '#2f4858' }}>
          Views
        </label>
      {dayData.images && dayData.images.length > 0 && (
        <div className={styles.imagesSection}>
          <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
              {dayData.images.length > 1 && (
                <button
                  className={styles.carouselButton1}
                  onClick={handlePrevious}
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
                  {dayData.images.map((image: any, index: number) => (
                    <div key={index} className={styles.imageSlide}>
                      <img
                        src={image.imageUrl}
                        alt={`Day ${dayData.dayNumber} - Image ${image.position}`}
                        className={styles.carouselImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {dayData.images.length > 1 && (
                <button
                  className={styles.carouselButton}
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ArrowRightIcon width={30} height={30} />
                </button>
              )}
            </div>
            {dayData.images.length > 1 && (
              <div className={styles.carouselDots}>
                {getVisibleDots().map((dotIndex: number) => (
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
      )}

        <ActivityDetail
        items={dayData?.activities}
        />
    </div>
  );
};

export default DayDetails;
