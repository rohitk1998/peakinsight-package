import React, { useState } from 'react';
import styles from './itinerary-details.module.scss';
import CarouselResponsive from "../carousal-responsive/index";
import Accordion from '../accordian';

interface ItineraryProps {
  packageDetail: any ; 
}

const ItineraryDetail = ({ day }: { day: any }) => {
  return (
    <div key={day?.id}>
     <p style={{ fontSize: '14px', fontWeight: 'normal', color: '#090909' }}>
      {day?.description}
     </p>
    </div>
  );
}

const ItineraryDetails: React.FC<ItineraryProps> = ({ packageDetail }) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const handleToggle = (index: number)=> {
    setOpenAccordion(prev => (prev === index ? null : index));
  }

  return (
    <div className={styles.Container}>
      {
        packageDetail?.days?.map((day: any , index : number ) => (
          <div key={index}>
            <CarouselResponsive  images={day?.images} />
            <Accordion 
             title={`Day ${day?.dayNumber} `}
             description={day?.title}
             content={<ItineraryDetail day={day} />}
              isOpen={openAccordion !== null && openAccordion == index} 
              onToggle={()=> handleToggle(index)}
               />
          </div>
        ))
      }
    </div>
  );
};

export default ItineraryDetails;
