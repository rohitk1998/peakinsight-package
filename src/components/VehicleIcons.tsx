import React from 'react';

export type VehicleIconProps = {
    size?: number | string;
    className?: string;
    strokeWidth?: number;
    title?: string;
};

const defaultSize = 24;

export const CarIcon: React.FC<VehicleIconProps> = ({ size = defaultSize, className, strokeWidth = 2, title = 'Car' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        role="img"
        aria-label={title}
    >
        <title>{title}</title>
        <path d="M3 13l2-5a3 3 0 0 1 2.8-2h7.4a3 3 0 0 1 2.8 2l2 5" />
        <path d="M5 13h14a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-1" />
        <path d="M5 13a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h1" />
        <circle cx="7.5" cy="19" r="1.5" />
        <circle cx="16.5" cy="19" r="1.5" />
        <path d="M7 11h10" />
    </svg>
);

export const BusIcon: React.FC<VehicleIconProps> = ({ size = defaultSize, className, strokeWidth = 2, title = 'Bus' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        role="img"
        aria-label={title}
    >
        <title>{title}</title>
        <rect x="4" y="4" width="16" height="12" rx="2" />
        <path d="M4 10h16" />
        <path d="M7 7h3" />
        <path d="M12 7h3" />
        <path d="M17 7h2" />
        <circle cx="7" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
        <path d="M4 16h16" />
    </svg>
);

export const TrainIcon: React.FC<VehicleIconProps> = ({ size = defaultSize, className, strokeWidth = 2, title = 'Train' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        role="img"
        aria-label={title}
    >
        <title>{title}</title>
        <rect x="6" y="3" width="12" height="12" rx="2" />
        <path d="M6 9h12" />
        <circle cx="9" cy="14" r="1.5" />
        <circle cx="15" cy="14" r="1.5" />
        <path d="M8 21l-2 0" />
        <path d="M16 21l2 0" />
        <path d="M8 21l8-4" />
        <path d="M16 21l-8-4" />
    </svg>
);

export const BikeIcon: React.FC<VehicleIconProps> = ({ size = defaultSize, className, strokeWidth = 2, title = 'Bike' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        role="img"
        aria-label={title}
    >
        <title>{title}</title>
        <circle cx="6" cy="17" r="3.5" />
        <circle cx="18" cy="17" r="3.5" />
        <path d="M6 17l5-7h3l3 5" />
        <path d="M11 10l-1-3h3" />
        <circle cx="13" cy="5" r="1" />
    </svg>
);

export default { CarIcon, BusIcon, TrainIcon, BikeIcon };

