import React from 'react';
import './TripSummary.scss';

interface Activity {
  name: string;
}

interface Transfer {
  travelFrom: string;
  travelTo: string;
}

interface Stay {
  name: string;
  mealPlan?: string;
}

interface TripDay {
  dayNumber: number;
  title: string;
  activities: Activity[] | null; 
  transfer: Transfer | null;    
  stay: Stay | null;
}

interface PackageDetail {
  days: TripDay[];
}

interface TripSummaryProps {
  packageDetail: PackageDetail | null | undefined;
}

const renderIcon = (type: string) => {

  switch(type) {
    case 'activity':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      );
    case 'transfer':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"/>
          <circle cx="8.5" cy="18" r="1.5"/>
          <circle cx="15.5" cy="18" r="1.5"/>
        </svg>
      );
    case 'hotel':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18"/>
          <path d="M9 8h1"/>
          <path d="M9 12h1"/>
          <path d="M9 16h1"/>
          <path d="M14 8h1"/>
          <path d="M14 12h1"/>
          <path d="M14 16h1"/>
          <path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/>
        </svg>
      );
    case 'meal':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
          <line x1="6" y1="1" x2="6" y2="4"/>
          <line x1="10" y1="1" x2="10" y2="4"/>
          <line x1="14" y1="1" x2="14" y2="4"/>
        </svg>
      );
    default:
      return null;
  }
};

const TripSummary: React.FC<TripSummaryProps> = ({ packageDetail }) => {
  const tripData: TripDay[] = packageDetail?.days || [];
  const totalActivities: number = tripData.reduce((sum, day) => sum + (day.activities?.length || 0), 0);
  const totalTransfers: number = tripData.filter(day => day.transfer !== null).length;
  const totalHotels: number = tripData.filter(day => day.stay !== null).length;

  return (
    <div className="trip-summary">
      <div className="summary-header">
        <h1 className="summary-title">Trip Summary</h1>
        <div className="summary-stats">
          <div className="stat-item">
            {renderIcon('activity')}
            <span>{totalActivities} Activities</span>
          </div>
          <div className="stat-item">
            {renderIcon('transfer')}
            <span>{totalTransfers} Transfers</span>
          </div>
          <div className="stat-item">
            {renderIcon('hotel')}
            <span>{totalHotels} Hotel{totalHotels !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {tripData.map((day: TripDay, index: number) => {

        const hasTransfer: boolean = day.transfer !== null;
        const hasActivities: boolean = day.activities !== null && day.activities.length > 0;
        const hasStay: boolean = day.stay !== null;
        
        return (
          <div key={index} className="day-section">
            <div className="day-header">
              <h2 className="day-title">Day {day.dayNumber} - {day.title}</h2>
              <div className="day-icons">
                {hasActivities && day.activities && (
                  <span className="icon-badge">{day.activities.length} {renderIcon('activity')}</span>
                )}
                {hasStay && (
                  <span className="icon-badge">1 {renderIcon('hotel')}</span>
                )}
                {hasTransfer && (
                  <span className="icon-badge">1 {renderIcon('transfer')}</span>
                )}
              </div>
            </div>

            {hasTransfer && day.transfer && (
              <div className="section-block">
                <div className="section-header">
                  {renderIcon('transfer')}
                  <span className="section-label">Transfer:</span>
                  <span className="inline-text">
                    Transfer from {day.transfer.travelFrom} to {day.transfer.travelTo}
                  </span>
                </div>
              </div>
            )}

            {hasActivities && day.activities && (
              <div className="section-block">
                <div className="section-header">
                  {renderIcon('activity')}
                  <span className="section-label">
                    {day.activities.length === 1 ? 'Activity:' : `${day.activities.length} Activities:`}
                  </span>
                  {day.activities.length === 1 && (
                    <span className="inline-text">{day.activities[0].name}</span>
                  )}
                </div>
                {day.activities.length > 1 && (
                  <ul className="section-list">
                    {day.activities.map((activity: Activity, idx: number) => (
                      <li key={idx}>{activity.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {hasStay && day.stay && (
              <div className="section-block">
                <div className="section-header">
                  {renderIcon('hotel')}
                  <span className="section-label">Hotel:</span>
                  <span className="inline-text">{day.stay.name}</span>
                </div>
              </div>
            )}

            {day.stay?.mealPlan && ( 
              <div className="meal-section">
                <div className="meal-info">
                  {renderIcon('meal')}
                  <span>{day.stay.mealPlan}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TripSummary;