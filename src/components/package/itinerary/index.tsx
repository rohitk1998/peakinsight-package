import React, { useState } from 'react';
import styles from './itinerary.module.scss';
import ItineraryDetails from './itinerary-details';

const tabs = [
  {
    id : 1 , 
    name:'Itinerary'
  },
  {
    id : 2 , 
    name:'Summarised View'
  },
  {
    id : 3 , 
    name:'Activities'
  },
  {
    id : 4 , 
    name:'Stay'
  },
  {
    id : 5 , 
    name:'Transfers'
  }
]

interface ItineraryProps {
  packageDetail: any; 
}

const Itinerary: React.FC<ItineraryProps> = ({ packageDetail }) => {
  const [activetab, setActiveTab] = useState(1); 

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

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${
                activetab === tab.id ? styles.active : ''
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.dayNumber}>{tab.name}</span>
            </button>
          ))}
        </div>
        <div className={styles.tabContent}>
        {activetab === 1 && <ItineraryDetails packageDetail={packageDetail} />}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
