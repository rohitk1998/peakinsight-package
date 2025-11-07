import React, { useState } from 'react';
import styles from './itinerary-details.module.scss';
// import {
//   ArrowLeftIcon,
//   ArrowRightIcon,
//   CarFront,
//   MapPin,
//   Clock,
// } from 'lucide-react';
// import ActivityDetail from '../activitydetail';

interface ItineraryProps {
  packageDetail: any ; 
}

const ItineraryDetails: React.FC<ItineraryProps> = ({ packageDetail }) => {

  console.log('packageDetail',packageDetail);
  

  return (
    <div className={styles.Container}>
       Hello
    </div>
  );
};

export default ItineraryDetails;
