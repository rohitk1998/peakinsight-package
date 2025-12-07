import React from 'react';
import { Check } from 'lucide-react';
import { CarIcon, BusIcon, TrainIcon, BikeIcon } from '../../VehicleIcons';
import './TransferGrid.scss';

interface TransferGridProps {
    days: any;
}

// Premium Car Icon with more detail
const PremiumCarIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
        <circle cx="6.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
);

const TransferGrid: React.FC<TransferGridProps> = ({ days }) => {
    const getVehicleIcon = (vehicleType: string) => {
        const vehicle = vehicleType?.toLowerCase() || '';
        const iconProps = { size: 28, className: 'vehicle-icon' }; // Increased size slightly

        if (vehicle.includes('sedan') || vehicle.includes('car')) {
            return <PremiumCarIcon {...iconProps} />;
        } else if (vehicle.includes('bus')) {
            return <BusIcon {...iconProps} title="Bus" />;
        } else if (vehicle.includes('train')) {
            return <TrainIcon {...iconProps} title="Train" />;
        } else if (vehicle.includes('bike') || vehicle.includes('motorcycle')) {
            return <BikeIcon {...iconProps} title="Bike" />;
        }
        return <CarIcon {...iconProps} title="Vehicle" />;
    };

    const transfers = days?.filter((day: any) => day.transfer !== null) || [];

    if (transfers.length === 0) {
        return (
            <div className="transfer-grid-container">
                <div className="no-transfers">
                    <p>No transfers scheduled for this trip</p>
                </div>
            </div>
        );
    }

    return (
        <div className="transfer-grid-container">
            <div className="transfer-grid">
                {transfers.map((item: any, index: number) => (
                    <div key={index} className="transfer-card">
                        <div className="day-badge">DAY {item.dayNumber}</div>
                        <div className="verified-badge">
                            <Check size={16} strokeWidth={3} />
                        </div>

                        <div className="card-header">
                            <div className="card-header-bg"></div>
                            <div className="vehicle-icon-wrapper">
                                {getVehicleIcon(item.transfer.vehicle)}
                            </div>
                            <h3 className="transfer-title">{item.transfer.vehicle}</h3>
                            <span className="transfer-subtitle">Private Transfer</span>
                        </div>

                        <div className="card-body">
                            <div className="route-timeline">
                                <div className="route-point start">
                                    <span className="point-label">From</span>
                                    <span className="point-name">{item.transfer.travelFrom}</span>
                                </div>
                                <div className="route-point end">
                                    <span className="point-label">To</span>
                                    <span className="point-name">{item.transfer.travelTo}</span>
                                </div>
                            </div>

                            {item.transfer.travelStops && item.transfer.travelStops.length > 0 && (
                                <div className="stops-section">
                                    <span className="stops-label">STOPS INCLUDED</span>
                                    <div className="stops-tags">
                                        {item.transfer.travelStops.map((stop: string, stopIndex: number) => (
                                            <span key={stopIndex} className="stop-tag">
                                                {stop}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransferGrid;
