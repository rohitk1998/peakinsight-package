import React, { useState } from 'react';
import { ChevronDown, ImageIcon, Coffee, UtensilsCrossed, Moon } from 'lucide-react';
import "./index.scss"


interface StayProps{
  packageDetail:any;
}

const Stay:React.FC<StayProps> = (
  {
    packageDetail
  }
) => {
  const [openDay, setOpenDay] = useState(0);

  const toggleDay = (dayIndex:any) => {
    setOpenDay(openDay === dayIndex ? -1 : dayIndex);
  };

  const renderStars = (rating:any) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Number(rating) ? 'star filled' : 'star'}>★</span>
    ));
  };

  return (
    <div className="stay-accordion">
      {packageDetail?.days?.map((item: any, index:number) => {
        if (!item.stay) return null;

        const isOpen = openDay === index;

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
                <div className="stay-header">
                  <div className="stay-icon">🏨</div>
                  <h4>Stay At</h4>
                </div>
                <h3 className="hotel-name">Check-In At {item.stay.name}</h3>
                <div className="hotels-grid">
                 {item.stay.images ? (
                    <div className="hotel-card single">
                      <div className="hotel-image">
                        <img src={item.stay.images[0]} alt={item.stay.name} />
                        <button className="gallery-btn">
                          <ImageIcon size={16} />
                          Gallery
                        </button>
                        {item.stay.starRating && (
                          <div className="rating-badge">
                            {renderStars(item?.stay?.starRating)}
                            {item.stay.starRating}/5
                          </div>
                        )}
                      </div>
                      <h5 className="hotel-title">{item.stay.name}</h5>
                      {item.stay.mealPlan && (
                        <p className="meal-plan">Meal Plan: {item.stay.mealPlan}</p>
                      )}
                    </div>
                  ) : null}
                </div>
                <div className="inclusions">
                  <h5>Inclusions:</h5>
                  <div className="inclusion-items">
                    <div className={`inclusion-item ${!item.stay.mealPlan ? 'included' : 'not-included'}`}>
                      <Coffee size={20} />
                      <div>
                        <span className="inclusion-name">Breakfast</span>
                        <span className="inclusion-status">
                          {!item.stay.mealPlan ? '✓ Included' : 'Not Included'}
                        </span>
                      </div>
                    </div>
                    <div className={`inclusion-item ${item.stay.mealPlan ? 'included' : 'not-included'}`}>
                      <UtensilsCrossed size={20} />
                      <div>
                        <span className="inclusion-name">Lunch</span>
                        <span className="inclusion-status">
                          {item.stay.mealPlan ? '✓ Included' : 'Not Included'}
                        </span>
                      </div>
                    </div>
                    <div className={`inclusion-item ${item.stay.mealPlan ? 'included' : 'not-included'}`}>
                      <Moon size={20} />
                      <div>
                        <span className="inclusion-name">Dinner</span>
                        <span className="inclusion-status">
                          {item.stay.mealPlan ? '✓ Included' : 'Not Included'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stay;