import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './accordian.scss';
import CarouselResponsive from '../carousal-responsive';

interface AccordionProps {
  items: any[];
}

const ActivityDetail: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      <div>
        {items?.map((item: any, index: number) => (
          <>
            {item?.activities !== null && (
              <div className="accordion-item" key={index}>
                <button
                  className={`accordion-header ${
                    activeIndex === index ? 'active' : ''
                  }`}
                  onClick={() => toggleItem(index)}
                >
                  <div className="accordian-heading">
                    {item?.activities?.map((activity: any, idx: number) => (
                      <span
                        style={{ color: 'black', fontWeight: '600' }}
                        key={idx}
                      >
                        {activity?.name}{' '}
                        <span style={{ color: 'black' }}>
                          {idx < item?.activities?.length - 1 ? ' | ' : ''}
                        </span>
                      </span>
                    ))}
                  </div>
                  <ChevronDown
                    className={`icon ${activeIndex === index ? 'rotate' : ''}`}
                    size={20}
                  />
                </button>
                {item?.activities?.map((activityItem: any) => (
                  <div
                    className={`accordion-content ${
                      activeIndex === index ? 'open' : ''
                    }`}
                  >
                    <p>{activityItem?.description}</p>
                    {activityItem?.images?.length !== 0 && (
                      <CarouselResponsive images={activityItem?.images} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default ActivityDetail;
