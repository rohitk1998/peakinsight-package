import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './accordian.scss';
import CarouselResponsive from '../carousal-responsive';

interface AccordionProps {
  items: any[];
  expandedView?: boolean;
}

const ActivityDetail: React.FC<AccordionProps> = ({ items, expandedView = false }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (expandedView) {
    return (
      <div className="activity-expanded-view">
        {items?.map((item: any, index: number) => (
          <div key={index}>
            {item?.activities?.map((activityItem: any, idx: number) => (
              <div key={idx} className="activity-card">
                <div className="card-header">
                  <h4 className="activity-title">{activityItem?.name}</h4>
                  <p className="activity-description">{activityItem?.description}</p>
                </div>
                {activityItem?.images?.length !== 0 && (
                  <div className="card-image-container">
                    <img
                      className="card-image"
                      src={activityItem?.images[0]}
                      alt={activityItem?.name || "Activity"}
                    />
                    <button className="gallery-btn">
                      View Gallery
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="accordion">
      {items?.map((item: any, index: number) => {
        if (!item?.activities) return null;

        const isOpen = activeIndex === index;

        return (
          <div className={`accordion-item ${isOpen ? 'active' : ''}`} key={index}>
            <button
              className="accordion-header"
              onClick={() => toggleItem(index)}
            >
              <div className="header-content">
                <span className="day-badge">DAY {item.dayNumber}</span>
                <h3 className="day-title">{item.title}</h3>
              </div>
              <ChevronDown
                className={`icon ${isOpen ? 'rotate' : ''}`}
                size={20}
              />
            </button>

            <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
              <div className="content-wrapper">
                {item.activities.map((activityItem: any, idx: number) => (
                  <div key={idx} className="activity-details">
                    <p className="description">{activityItem.description}</p>
                    {activityItem.images?.length > 0 && (
                      <div className="carousel-wrapper">
                        <CarouselResponsive images={activityItem.images} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityDetail;
