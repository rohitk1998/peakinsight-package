import React from 'react';
import styles from './itinerary-details.module.scss';
import CarouselResponsive from "../carousal-responsive/index";

interface ItineraryProps {
  packageDetail: any ; 
}

const ItineraryDetails: React.FC<ItineraryProps> = ({ packageDetail }) => {

  console.log('packageDetail',packageDetail);
  

  return (
    <div className={styles.Container}>
      <CarouselResponsive  images={packageDetail?.days[0]?.images} />
    </div>
  );
};

export default ItineraryDetails;
