import React from 'react';
import styles from './itinerary-details.module.scss';
// import {
//   ArrowLeftIcon,
//   ArrowRightIcon,
//   CarFront,
//   MapPin,
//   Clock,
// } from 'lucide-react';
// import ActivityDetail from '../activitydetail';
import CarouselResponsive from "../carousal-respnsive/index";

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
