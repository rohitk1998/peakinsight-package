import React, { useState } from 'react';
import styles from './itinerary.module.scss';
import DayDetails from './day-details';

interface ItineraryProps {
  itineraryData: any[]; 
}

const Itinerary: React.FC<ItineraryProps> = ({ itineraryData }) => {
  const [selectedDay, setSelectedDay] = useState(1); 

  if (!itineraryData || itineraryData.length === 0) {
    return (
      <div className={styles.itineraryContainer}>
        <p>No itinerary data available</p>
      </div>
    );
  }

  const selectedDayData = itineraryData.find(
    (day) => day.dayNumber === selectedDay
  );

  return (
    <div className={styles.itineraryContainer}>
      <div className={styles.itineraryContent}>
        <div>
          <label style={{ fontSize: '16px', fontWeight: 'normal', color: '#090909' }}>
            Trip Duration
          </label>
        </div>

        <div className={styles.tabs}>
          {itineraryData.map((day) => (
            <button
              key={day.dayNumber}
              className={`${styles.tab} ${
                selectedDay === day.dayNumber ? styles.active : ''
              }`}
              onClick={() => setSelectedDay(day.dayNumber)}
            >
              <span className={styles.dayNumber}>Day {day.dayNumber}</span>
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {selectedDayData && <DayDetails dayData={selectedDayData} />}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
