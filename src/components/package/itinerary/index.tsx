import React, { useState, useRef } from 'react';
import styles from './itinerary.module.scss';
import ItineraryDetails from './itinerary-details';
import SummarizedView from '../summarized-view';
import ActivityDetail from '../activitydetail';
import Stay from '../stay';
import TransferGrid from '../transfer/TransferGrid';

const tabs = [
  {
    id: 1,
    name: 'Itinerary'
  },
  {
    id: 2,
    name: 'Summarised View'
  },
  {
    id: 3,
    name: 'Activities'
  },
  {
    id: 4,
    name: 'Stay'
  },
  {
    id: 5,
    name: 'Transfers'
  }
]

interface ItineraryProps {
  packageDetail: any;
}

const Itinerary: React.FC<ItineraryProps> = ({ packageDetail }) => {
  const [activetab, setActiveTab] = useState(1);
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
    if (tabsRef.current) {
      // Adjusted offset to 0 to align tabs exactly to top, hiding the 'Trip Duration' title
      const yOffset = 0;
      const element = tabsRef.current;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!packageDetail || packageDetail?.days?.length === 0) {
    return (
      <div className={styles.itineraryContainer}>
        <p>No itinerary data available</p>
      </div>
    );
  }

  return (
    <div className={styles.itineraryContainer}>
      <div className={styles.itineraryContent}>
        <div>
          <label style={{ fontSize: '16px', fontWeight: 'normal', color: '#090909' }}>
            Trip Duration
          </label>
        </div>

        <div className={styles.tabs} ref={tabsRef}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activetab === tab.id ? styles.active : ''
                }`}
              onClick={() => handleTabClick(tab.id)}
            >
              <span className={styles.dayNumber}>{tab.name}</span>
            </button>
          ))}
        </div>
        {/* done well */}
        <div className={styles.tabContent}>
          {activetab === 1 && <ItineraryDetails packageDetail={packageDetail} />}
          {activetab === 2 && <SummarizedView packageDetail={packageDetail} />}
          {activetab === 3 && <ActivityDetail items={packageDetail?.days} />}
          {activetab === 4 && <Stay days={packageDetail?.days} />}
          {activetab === 5 && <TransferGrid days={packageDetail?.days} />}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
