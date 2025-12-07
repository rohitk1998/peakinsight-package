import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { CarIcon, BusIcon, TrainIcon, BikeIcon } from '../../VehicleIcons';
import './index.scss';

interface TransferProps {
  days: any;
  expandedView?: boolean;
}

const Transfer: React.FC<TransferProps> = ({ days, expandedView = false }) => {
  // Initialize openDay to the first index that has a transfer, or -1 if none
  const [openDay, setOpenDay] = useState(() => {
    if (!days) return -1;
    const firstTransferIndex = days.findIndex((day: any) => day.transfer);
    return firstTransferIndex !== -1 ? firstTransferIndex : -1;
  });

  const toggleDay = (e: React.MouseEvent, dayIndex: any) => {
    e.stopPropagation(); // Prevent event bubbling
    setOpenDay(openDay === dayIndex ? -1 : dayIndex);
  };

  const getVehicleIcon = (vehicleType: string) => {
    const vehicle = vehicleType?.toLowerCase() || '';
    const iconProps = { size: 20, className: 'vehicle-icon' };

    if (vehicle.includes('sedan') || vehicle.includes('car')) {
      return <CarIcon {...iconProps} title="Sedan" />;
    } else if (vehicle.includes('bus')) {
      return <BusIcon {...iconProps} title="Bus" />;
    } else if (vehicle.includes('train')) {
      return <TrainIcon {...iconProps} title="Train" />;
    } else if (vehicle.includes('bike') || vehicle.includes('motorcycle')) {
      return <BikeIcon {...iconProps} title="Bike" />;
    }
    return <CarIcon {...iconProps} title="Vehicle" />;
  };

  const getTransferType = (vehicleType: string) => {
    const vehicle = vehicleType?.toLowerCase() || '';
    if (vehicle.includes('bike') || vehicle.includes('motorcycle')) {
      return 'Ride';
    }
    return 'Transfer';
  };

  const transfers = days?.filter((day: any) => day.transfer !== null) || [];

  if (transfers.length === 0) {
    if (expandedView) return null; // Don't show "No transfers" in expanded view, just hide
    return (
      <div className="transfer-accordion">
        <div className="no-transfers">
          <p>No transfers scheduled for this trip</p>
        </div>
      </div>
    );
  }

  const renderTransferContent = (item: any) => {
    const transferType = getTransferType(item.transfer.vehicle);
    return (
      <div className="transfer-item">
        <div className="transfer-icon">
          {getVehicleIcon(item.transfer.vehicle)}
        </div>
        <div className="transfer-details">
          <div className="transfer-route">
            <span className="transfer-type">{transferType} from</span>
            <span className="transfer-location">{item.transfer.travelFrom}</span>
            <ArrowRight size={16} className="arrow-icon" />
            <span className="transfer-location">{item.transfer.travelTo}</span>
          </div>
          <div className="transfer-vehicle">
            <span className="vehicle-label">Vehicle:</span>
            <span className="vehicle-name">{item.transfer.vehicle}</span>
          </div>
          {item.transfer.travelStops && item.transfer.travelStops.length > 0 && (
            <div className="transfer-stops">
              <span className="stops-label">Stops:</span>
              <div className="stops-list">
                {item.transfer.travelStops.map((stop: string, stopIndex: number) => (
                  <span key={stopIndex} className="stop-item">
                    {stop}
                    {stopIndex < item.transfer.travelStops.length - 1 && ', '}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (expandedView) {
    return (
      <div className="transfer-expanded-view">
        {days?.map((item: any, index: number) => {
          if (!item.transfer) return null;
          return (
            <div key={index} className="transfer-item-wrapper">
              {renderTransferContent(item)}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="transfer-accordion">
      {days?.map((item: any, index: number) => {
        if (!item.transfer) return null;

        const isOpen = openDay === index;

        return (
          <div key={index} className={`accordion-item ${isOpen ? 'open' : ''}`}>
            <div className="accordion-header" onClick={(e) => toggleDay(e, index)}>
              <div className="header-content">
                <span className="day-badge">DAY {item.dayNumber}</span>
                <h3 className="day-title">{item.title}</h3>
              </div>
              <ChevronDown className={`chevron ${isOpen ? 'rotated' : ''}`} />
            </div>
            {isOpen && (
              <div className="accordion-content">
                {renderTransferContent(item)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Transfer;

