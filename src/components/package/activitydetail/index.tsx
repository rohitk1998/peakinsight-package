import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './accordian.scss';
import CarouselResponsive from '../carousal-responsive';
import FullScreenCarousel from '../corousal';

interface AccordionProps {
  items: any[];
  expandedView?: boolean;
}

const ActivityDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const WORD_LIMIT = 100;

  const words = description?.split(' ') || [];
  const isLong = words.length > WORD_LIMIT;
  const displayText = isExpanded ? description : words.slice(0, WORD_LIMIT).join(' ') + (isLong ? '...' : '');

  return (
    <div className="description-container">
      <p className="description">
        {displayText}
        {isLong && (
          <span className="read-more" onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}>
            {isExpanded ? ' Read Less' : ' Read More'}
          </span>
        )}
      </p>
    </div>
  );
};

const ExperiencesSection = ({ experiences }: { experiences: any[] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const VISIBLE_COUNT = 4;
  const displayItems = experiences.length > 0 ? experiences : [];

  if (displayItems.length === 0) return null;

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStartIndex((prev) => (prev + 1) % displayItems.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStartIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
  };

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      const index = (startIndex + i) % displayItems.length;
      items.push(displayItems[index]);
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="experiences-section">
      <div className="section-header">
        <h4>You will be covering these amazing experiences</h4>
        {/* <div className="nav-arrows">
          <button className="nav-btn prev" onClick={prevSlide}>‹</button>
          <button className="nav-btn next" onClick={nextSlide}>›</button>
        </div> */}
      </div>
      <div className="experiences-list">
        {visibleItems.map((exp: any, i: number) => (
          <div key={`${startIndex}-${i}`} className="experience-card">
            <div className="img-wrap">
              <img src={exp.image || "https://placehold.co/150x200"} alt={exp.title} />
            </div>
            <span className="exp-index">{(startIndex + i) % displayItems.length + 1}. {exp.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActivityDetail: React.FC<AccordionProps> = ({ items, expandedView = false }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (expandedView) {
    return (
      <div className="activity-expanded-view">
        {items?.map((item: any, index: number) => (
          <React.Fragment key={index}>
            {item?.activities?.map((activityItem: any, idx: number) => (
              <div key={`${index}-${idx}`} className="expanded-activity-card">
                <div className="card-image-wrapper">
                  <img
                    src={activityItem?.images?.[0] || "https://placehold.co/600x400"}
                    alt={activityItem?.name || "Activity"}
                    className="card-bg-image"
                  />
                  <div className="card-overlay"></div>
                  <div className="card-content-overlay">
                    <div className="text-content">
                      <span className="day-label">DAY {item.dayNumber}</span>
                      <h3 className="card-title">{activityItem?.name || activityItem?.title}</h3>
                      <p className="card-description">
                        {activityItem?.description?.slice(0, 80)}...
                      </p>
                    </div>
                    {activityItem?.images?.length > 0 && (
                      <button className="view-gallery-btn" onClick={() => {
                        setSelectedImages(activityItem?.images)
                        setOpenModal(true)
                      }}>
                        View Gallery
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
            {
              selectedImages?.length > 0 && (
                <FullScreenCarousel
                  images={selectedImages}
                  isOpen={openModal}
                  onClose={() => setOpenModal(false)}
                  imgIndex={0}
                />
              )
            }
          </React.Fragment>
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
          <div className='container-activity'>
            <div key={index} className={`accordion-item ${isOpen ? 'open' : ''}`}>
              <div className="accordion-header" onClick={() => toggleItem(index)}>
                <div className="header-content">
                  <span className="day-badge">DAY {item.dayNumber}</span>
                  <h3 className="day-title">{item.title}</h3>
                </div>
                <ChevronDown className={`chevron ${isOpen ? 'rotated' : ''}`} />
              </div>

              {isOpen && (
                <div className="accordion-content">
                  {item.activities.map((activityItem: any, idx: number) => (
                    <div key={idx} className="activity-details">
                      <h2 className="main-activity-title">{activityItem.title || item.title}</h2>
                      {activityItem.images?.length > 0 && (
                        <div className="carousel-wrapper">
                          <CarouselResponsive images={activityItem.images} />
                        </div>
                      )}
                      <ActivityDescription description={activityItem.description} />
                      <ExperiencesSection experiences={activityItem.experiences || [
                        { title: "Tsemo Castle", image: activityItem.images?.[0] || "" },
                        { title: "Shanti Stupa", image: activityItem.images?.[1] || "" },
                        { title: "Leh Palace", image: activityItem.images?.[2] || "" },
                        { title: "Market", image: activityItem.images?.[3] || "" },
                        { title: "Monastery", image: activityItem.images?.[0] || "" }
                      ]} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityDetail;
