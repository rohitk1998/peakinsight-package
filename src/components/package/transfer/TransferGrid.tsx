import React, { useState, useEffect } from 'react';
import './TransferGrid.scss';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TransferGridProps {
    days: any[];
    expandedView?: boolean;
}

// Grey filled car icon
const CarIcon = ({ size = 18, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#6B7280" className={className}>
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
);

const PlaneIcon = ({ size = 18, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 12h20" />
        <path d="M13 12l3-7" />
        <path d="M6 12l2-3" />
        <path d="M22 12l-2 3" />
        <path d="M4 12l-2 3" />
    </svg>
);

// Google Maps style start point (green circle with dot)
const StartPointIcon = ({ size = 20, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="8" fill="#34A853" stroke="#fff" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="#fff" />
    </svg>
);

// Google Maps style destination point (red pin)
const EndPointIcon = ({ size = 20, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335" />
        <circle cx="12" cy="9" r="2.5" fill="#fff" />
    </svg>
);

const PinIcon = ({ size = 16, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);


const TransferGrid: React.FC<TransferGridProps> = ({ days, expandedView = false }) => {
    const getInitialOpenIndex = () => {
        if (!days || days.length === 0) return -1;
        const firstTransferIndex = days.findIndex((day: any) => day?.transfer !== null);
        return firstTransferIndex >= 0 ? firstTransferIndex : -1;
    };

    const [openDay, setOpenDay] = useState(getInitialOpenIndex);
    const [showStops, setShowStops] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        if (!days || days.length === 0) return;
        const firstTransferIndex = days.findIndex((day: any) => day?.transfer !== null);
        if (firstTransferIndex >= 0) {
            setOpenDay(firstTransferIndex);
        }
    }, [days]);

    const toggleDay = (dayIndex: number) => {
        setOpenDay(openDay === dayIndex ? -1 : dayIndex);
    };

    const toggleStops = (dayIndex: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setShowStops(prev => ({ ...prev, [dayIndex]: !prev[dayIndex] }));
    };

    const renderTransferContent = (transfer: any, dayIndex: number) => (
        <div className="transfer-content-wrapper">
            <div className="transfer-type-header">
                <CarIcon size={18} className="car-icon" />
                <span className="transfer-type-label">Private Transfer</span>
            </div>

            <h3 className="transfer-vehicle-title">
                Transfer in {transfer.vehicle || 'Private Vehicle'}
            </h3>

            <div className="timeline-container">
                <div className="timeline-point start">
                    <div className="pin-icon-wrapper">
                        <StartPointIcon size={24} className="map-pin-icon" />
                    </div>
                    <div className="location-content">
                        <div className="label-badge">From</div>
                        <div className="location-box">
                            {transfer.vehicle?.toLowerCase().includes('flight') && <PlaneIcon size={18} className="inline-icon" />}
                            <span className="location-text">{transfer.travelFrom}</span>
                        </div>
                    </div>
                </div>

                <div className="timeline-connector-area">
                    {transfer.travelStops && transfer.travelStops.length > 0 && (
                        <button
                            className="view-stops-btn"
                            onClick={(e) => toggleStops(dayIndex, e)}
                        >
                            {showStops[dayIndex] ? (
                                <>Hide {transfer.travelStops.length} Stops <ChevronUp className={`chevron ${showStops[dayIndex] ? 'rotated' : ''}`} size={12} /></>
                            ) : (
                                <>View {transfer.travelStops.length} Stops <ChevronDown className={`chevron ${showStops[dayIndex] ? 'rotated' : ''}`} size={12} /></>
                            )}
                        </button>
                    )}
                </div>

                {showStops[dayIndex] && transfer.travelStops && (
                    <div className="stops-list-inline">
                        {transfer.travelStops.map((stop: string, idx: number) => (
                            <div key={idx} className="timeline-point stop">
                                <div className="location-content">
                                    <div className="location-box stop-box">
                                        <span className="location-text">{stop}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="timeline-point end">
                    <div className="pin-icon-wrapper">
                        <EndPointIcon size={24} className="map-pin-icon" />
                    </div>
                    <div className="location-content">
                        <div className="label-badge">To</div>
                        <div className="location-box">
                            <PinIcon size={18} className="inline-icon" />
                            <span className="location-text">{transfer.travelTo}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    if (expandedView) {
        return (
            <div className="transfer-accordion expanded">
                {days?.map((item: any, index: number) => {
                    if (!item.transfer) return null;
                    return (
                        <div key={index} className="transfer-expanded-item" style={{ marginBottom: '24px' }}>
                            {renderTransferContent(item.transfer, index)}
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
                const transfer = item.transfer;

                return (
                    <div key={index} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                        <div className="accordion-header" onClick={() => toggleDay(index)}>
                            <div className="header-content">
                                <span className="day-badge">DAY {item.dayNumber}</span>
                                <h3 className="day-title">{item.title}</h3>
                            </div>
                            <ChevronDown className={`chevron ${isOpen ? 'rotated' : ''}`} size={20} />
                        </div>

                        {isOpen && (
                            <div className="accordion-content">
                                {renderTransferContent(transfer, index)}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default TransferGrid;