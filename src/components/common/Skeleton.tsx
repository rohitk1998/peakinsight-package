import React from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
    style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({
    width,
    height,
    borderRadius,
    className,
    style,
}) => {
    const stylesObj = {
        width,
        height,
        borderRadius,
        ...style,
    };

    return (
        <div
            className={`${styles.skeleton} ${className || ''}`}
            style={stylesObj}
        />
    );
};

export default Skeleton;
