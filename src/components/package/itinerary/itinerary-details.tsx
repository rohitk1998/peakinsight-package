import React, { useState } from 'react';
import styles from './itinerary-details.module.scss';
import CarouselResponsive from "../carousal-responsive/index";
import Accordion from '../accordian';
import ActivityDetail from '../activitydetail';
import Stay from '../stay';
import TransferGrid from '../transfer/TransferGrid';

interface ItineraryProps {
  packageDetail: any;
}

const ItineraryDetail = ({ day, packageDetail }: { day: any, packageDetail: any }) => {

  console.log("day", packageDetail)
  return (
    <div key={day?.id} className={styles.itineraryContent}>
      {
        day?.activities?.length > 0 &&
        (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Activities</h3>
            </div>
            <ActivityDetail items={[day]} expandedView={true} />
          </div>
        )
      }

      {
        day?.stay && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Stays</h3>
            </div>
            <Stay days={[day]} expandedView={true} />
          </div>
        )
      }

      {
        day?.transfer && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Transfers</h3>
            </div>
            <TransferGrid days={[day]} expandedView={true} />
          </div>
        )
      }
    </div>
  );
}

const ItineraryDetails: React.FC<ItineraryProps> = ({ packageDetail }) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenAccordion(prev => (prev === index ? null : index));
  }

  return (
    <div className={styles.Container}>
      {
        packageDetail?.days?.map((day: any, index: number) => (
          <div key={index} className={styles.dayContainer}>
            <CarouselResponsive
              images={day?.images}
            />
            <Accordion
              title={`Day ${day?.dayNumber} `}
              description={day?.title}
              content={<ItineraryDetail day={day} packageDetail={packageDetail} />}
              isOpen={openAccordion !== null && openAccordion == index}
              onToggle={() => handleToggle(index)}
            />
          </div>
        ))
      }
    </div>
  );
};

export default ItineraryDetails;
