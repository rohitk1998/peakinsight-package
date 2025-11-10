import React, { useState } from 'react';
import { ChevronDown, ImageIcon, Coffee, UtensilsCrossed, Moon } from 'lucide-react';

const StayAccordion = () => {
  const [openDay, setOpenDay] = useState(0);

  // Sample data structure
  const itinerary = [
    {
      day: 1,
      title: "Arrival in Zurich",
      stay: {
        hotelName: "Deluxe Hotel",
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        nights: 5,
        category: "Stays will be allocated based on availability or similar category",
        hotels: [
          {
            name: "Swiss Chocolate by Fassbind",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
            rating: 4
          },
          {
            name: "ibis Zurich City West",
            image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
            rating: 4
          }
        ],
        roomDetails: {
          rooms: 1,
          guests: 1
        },
        inclusions: {
          breakfast: { included: true },
          lunch: { included: false },
          dinner: { included: false }
        },
        earlyCheckIn: "Early check-in is allowed after 00:00"
      }
    },
    {
      day: 2,
      title: "City Tour",
      stay: {
        hotelName: "Shimla Resort",
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        nights: 2,
        images: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400"
        ],
        starRating: 2,
        mealPlan: "Lunch & Dinner",
        roomDetails: {
          rooms: 1,
          guests: 2
        },
        inclusions: {
          breakfast: { included: false },
          lunch: { included: true },
          dinner: { included: true }
        }
      }
    },
    {
      day: 3,
      title: "Mountain Adventure"
      // No stay for this day
    }
  ];

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
      {itinerary.map((item, index) => {
        if (!item.stay) return null;

        const isOpen = openDay === index;

        return (
          <div key={index} className={`accordion-item ${isOpen ? 'open' : ''}`}>
            <div className="accordion-header" onClick={() => toggleDay(index)}>
              <div className="header-content">
                <span className="day-badge">DAY {item.day}</span>
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

                <h3 className="hotel-name">Check-In At {item.stay.hotelName}</h3>

                <div className="check-times">
                  <div className="check-time">
                    <span className="label">Check In</span>
                    <span className="time">{item.stay.checkIn}</span>
                  </div>
                  <div className="nights-badge">{item.stay.nights}N 🌙</div>
                  <div className="check-time">
                    <span className="label">Check Out</span>
                    <span className="time">{item.stay.checkOut}</span>
                  </div>
                </div>

                {item.stay.category && (
                  <p className="category-note">{item.stay.category}</p>
                )}

                <div className="hotels-grid">
                  {item.stay.hotels ? (
                    item.stay.hotels.map((hotel, idx) => (
                      <div key={idx} className="hotel-card">
                        <div className="hotel-image">
                          <img src={hotel.image} alt={hotel.name} />
                          <button className="gallery-btn">
                            <ImageIcon size={16} />
                            Gallery
                          </button>
                          <div className="rating-badge">
                            {renderStars(hotel.rating)}
                            {hotel.rating}/5
                          </div>
                        </div>
                        <h5 className="hotel-title">{hotel.name}</h5>
                      </div>
                    ))
                  ) : item.stay.images ? (
                    <div className="hotel-card single">
                      <div className="hotel-image">
                        <img src={item.stay.images[0]} alt={item.stay.hotelName} />
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
                      <h5 className="hotel-title">{item.stay.hotelName}</h5>
                      {item.stay.mealPlan && (
                        <p className="meal-plan">Meal Plan: {item.stay.mealPlan}</p>
                      )}
                    </div>
                  ) : null}
                </div>

                <div className="room-details">
                  <span className="detail-text">
                    {item.stay.roomDetails.rooms} Room - {item.stay.roomDetails.guests} Guest{item.stay.roomDetails.guests > 1 ? 's' : ''}
                  </span>
                  <button className="details-link">+Details</button>
                </div>

                <div className="inclusions">
                  <h5>Inclusions:</h5>
                  <div className="inclusion-items">
                    <div className={`inclusion-item ${item.stay.inclusions.breakfast.included ? 'included' : 'not-included'}`}>
                      <Coffee size={20} />
                      <div>
                        <span className="inclusion-name">Breakfast</span>
                        <span className="inclusion-status">
                          {item.stay.inclusions.breakfast.included ? '✓ Included' : 'Not Included'}
                        </span>
                      </div>
                    </div>
                    <div className={`inclusion-item ${item.stay.inclusions.lunch.included ? 'included' : 'not-included'}`}>
                      <UtensilsCrossed size={20} />
                      <div>
                        <span className="inclusion-name">Lunch</span>
                        <span className="inclusion-status">
                          {item.stay.inclusions.lunch.included ? '✓ Included' : 'Not Included'}
                        </span>
                      </div>
                    </div>
                    <div className={`inclusion-item ${item.stay.inclusions.dinner.included ? 'included' : 'not-included'}`}>
                      <Moon size={20} />
                      <div>
                        <span className="inclusion-name">Dinner</span>
                        <span className="inclusion-status">
                          {item.stay.inclusions.dinner.included ? '✓ Included' : 'Not Included'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {item.stay.earlyCheckIn && (
                  <div className="early-checkin">
                    ✓ {item.stay.earlyCheckIn}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        .stay-accordion {
          max-width: 750px;
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .accordion-item {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          margin-bottom: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .accordion-header:hover {
          background: #f9fafb;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .day-badge {
          background: #ea580c;
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .day-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .chevron {
          transition: transform 0.3s ease;
          color: #6b7280;
        }

        .chevron.rotated {
          transform: rotate(180deg);
        }

        .accordion-content {
          padding: 0 24px 24px;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stay-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .stay-icon {
          font-size: 20px;
        }

        .stay-header h4 {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        .hotel-name {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 20px 0;
        }

        .check-times {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .check-time {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .check-time .label {
          font-size: 12px;
          color: #6b7280;
        }

        .check-time .time {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
        }

        .nights-badge {
          background: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          border: 1px solid #e5e7eb;
        }

        .category-note {
          color: #2563eb;
          font-size: 14px;
          margin: 0 0 20px 0;
        }

        .hotels-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .hotel-card.single {
          grid-column: 1 / -1;
          max-width: 400px;
        }

        .hotel-card {
          border-radius: 8px;
          overflow: hidden;
        }

        .hotel-image {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .hotel-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gallery-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .gallery-btn:hover {
          background: rgba(0, 0, 0, 0.85);
        }

        .rating-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .star {
          color: #d1d5db;
          font-size: 14px;
        }

        .star.filled {
          color: #fbbf24;
        }

        .hotel-title {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          margin: 12px 0 0 0;
        }

        .meal-plan {
          font-size: 13px;
          color: #6b7280;
          margin: 4px 0 0 0;
        }

        .room-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #f0f9ff;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .detail-text {
          font-size: 14px;
          color: #111827;
        }

        .details-link {
          background: none;
          border: none;
          color: #2563eb;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .inclusions {
          margin-bottom: 16px;
        }

        .inclusions h5 {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 12px 0;
        }

        .inclusion-items {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .inclusion-item {
          background: white;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .inclusion-item > div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .inclusion-name {
          font-size: 13px;
          color: #111827;
          font-weight: 500;
        }

        .inclusion-status {
          font-size: 12px;
        }

        .inclusion-item.included {
          color: #059669;
        }

        .inclusion-item.included .inclusion-status {
          color: #059669;
        }

        .inclusion-item.not-included {
          color: #6b7280;
        }

        .inclusion-item.not-included .inclusion-status {
          color: #9ca3af;
        }

        .early-checkin {
          color: #059669;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        @media (max-width: 640px) {
          .hotels-grid {
            grid-template-columns: 1fr;
          }

          .inclusion-items {
            grid-template-columns: 1fr;
          }

          .check-times {
            flex-direction: column;
            gap: 12px;
          }

          .check-time {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
};

export default StayAccordion;