import React, { useState, useEffect } from 'react';
import { ChevronDown, ImageIcon, Coffee, UtensilsCrossed, Moon, Star, MapPin, Clock } from 'lucide-react';
import "./index.scss"

interface StayProps {
  days: any;
  expandedView?: boolean;
}

const Stay: React.FC<StayProps> = ({ days, expandedView = false }) => {
  // Find the first index that has a stay
  const getInitialOpenIndex = () => {
    if (!days || days.length === 0) return -1;
    const firstStayIndex = days.findIndex((day: any) => day?.stay !== null);
    return firstStayIndex >= 0 ? firstStayIndex : -1;
  };

  const [openDay, setOpenDay] = useState(getInitialOpenIndex);

  // Update openDay when days prop changes
  useEffect(() => {
    if (!days || days.length === 0) return;
    const firstStayIndex = days.findIndex((day: any) => day?.stay !== null);
    if (firstStayIndex >= 0) {
      setOpenDay(firstStayIndex);
    }
  }, [days]);

  const toggleDay = (dayIndex: any) => {
    setOpenDay(openDay === dayIndex ? -1 : dayIndex);
  };

  const renderStayContent = (stay: any) => (
    <div className="stay-inner-content">
      {/* Hero Image Section */}
      <div className="stay-hero-section">
        {stay.images && stay.images.length > 0 ? (
          <img src={stay.images[0]} alt={stay.name} />
        ) : (
          <div className="placeholder-image" />
        )}
        <div className="hero-overlay"></div>

        <button className="gallery-btn">
          <ImageIcon size={16} />
          View Gallery
        </button>

        {stay.starRating && (
          <div className="rating-badge">
            <Star className="star" fill="currentColor" size={16} />
            <span>{stay.starRating} / 5</span>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="stay-details-section">
        <div className="stay-header-row">
          <div className="hotel-info">
            <h3>{stay.name}</h3>
            <div className="stay-subtitle">
              <MapPin size={14} />
              <span>Premium Stay</span>
              <span className="separator"></span>
              <Clock size={14} />
              <span>Check-in: 12:00 PM</span>
            </div>
          </div>
          <div className="check-in-badge">
            Confirmed Booking
          </div>
        </div>

        {/* Features & Inclusions */}
        <div className="features-grid">
          {stay.mealPlan && (
            <div className="feature-chip info">
              <span>Meal Plan: {stay.mealPlan}</span>
            </div>
          )}

          <div className={`feature-chip ${!stay.mealPlan ? 'included' : ''}`}>
            <Coffee size={16} />
            <span>Breakfast {!stay.mealPlan ? 'Included' : ''}</span>
          </div>

          <div className={`feature-chip ${stay.mealPlan ? 'included' : ''}`}>
            <UtensilsCrossed size={16} />
            <span>Lunch {stay.mealPlan ? 'Included' : ''}</span>
          </div>

          <div className={`feature-chip ${stay.mealPlan ? 'included' : ''}`}>
            <Moon size={16} />
            <span>Dinner {stay.mealPlan ? 'Included' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (expandedView) {
    return (
      <div className="stay-expanded-view">
        {days?.map((item: any, index: number) => {
          if (!item.stay) return null;
          return (
            <div key={index} className="stay-item-expanded">
              {renderStayContent(item.stay)}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="stay-accordion">
      {days?.map((item: any, index: number) => {
        if (!item.stay) return null;

        const isOpen = openDay === index;
        const stay = item.stay;

        return (
          <div key={index} className={`accordion-item ${isOpen ? 'open' : ''}`}>
            <div className="accordion-header" onClick={() => toggleDay(index)}>
              <div className="header-content">
                <span className="day-badge">DAY {item.dayNumber}</span>
                <h3 className="day-title">{item.title}</h3>
              </div>
              <ChevronDown className={`chevron ${isOpen ? 'rotated' : ''}`} />
            </div>

            {isOpen && (
              <div className="accordion-content">
                {renderStayContent(stay)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stay;