import React from 'react';
import { MapPin, Car, Hotel, Utensils, Calendar, Activity as ActivityIcon } from 'lucide-react';
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
          <div className="stat-card">
            <div className="stat-icon">
              <ActivityIcon size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{totalActivities}</span>
              <span className="stat-label">Activities</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Car size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{totalTransfers}</span>
              <span className="stat-label">Transfers</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Hotel size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{totalHotels}</span>
              <span className="stat-label">Hotels</span>
            </div>
          </div>
        </div>
      </div>

      <div className="timeline-container">
        {tripData.map((day: TripDay, index: number) => {
          const hasTransfer = day.transfer !== null;
          const hasActivities = day.activities !== null && day.activities.length > 0;
          const hasStay = day.stay !== null;

          return (
            <div key={index} className="timeline-day">
              <div className="timeline-marker"></div>
              <div className="day-card">
                <div className="day-header">
                  <div className="day-title-wrapper">
                    <span className="day-number">Day {day.dayNumber}</span>
                    <h3>{day.title}</h3>
                  </div>
                </div>

                <div className="day-content">
                  {hasTransfer && day.transfer && (
                    <div className="content-row">
                      <div className="row-icon">
                        <Car size={18} />
                      </div>
                      <div className="row-details">
                        <span className="row-label">Transfer</span>
                        <div className="row-text">
                          {day.transfer.travelFrom} <span style={{ color: '#9ca3af' }}>→</span> {day.transfer.travelTo}
                        </div>
                      </div>
                    </div>
                  )}

                  {hasActivities && day.activities && (
                    <div className="content-row">
                      <div className="row-icon">
                        <MapPin size={18} />
                      </div>
                      <div className="row-details">
                        <span className="row-label">Activities</span>
                        {day.activities.length === 1 ? (
                          <div className="row-text">{day.activities[0].name}</div>
                        ) : (
                          <ul className="activity-list">
                            {day.activities.map((activity: Activity, idx: number) => (
                              <li key={idx}>{activity.name}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}

                  {hasStay && day.stay && (
                    <div className="content-row">
                      <div className="row-icon">
                        <Hotel size={18} />
                      </div>
                      <div className="row-details">
                        <span className="row-label">Stay</span>
                        <div className="row-text">{day.stay.name}</div>
                      </div>
                    </div>
                  )}

                  {day.stay?.mealPlan && (
                    <div className="content-row">
                      <div className="row-icon">
                        <Utensils size={18} />
                      </div>
                      <div className="row-details">
                        <span className="row-label">Meals</span>
                        <div className="row-text">{day.stay.mealPlan}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripSummary;