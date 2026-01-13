import React from 'react';
import './SkeletonLoader.css';

// Card Skeleton for Dashboard
export const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-header">
                <div className="skeleton skeleton-circle"></div>
                <div className="skeleton-text-group">
                    <div className="skeleton skeleton-text skeleton-text-sm"></div>
                    <div className="skeleton skeleton-text skeleton-text-lg"></div>
                </div>
            </div>
            <div className="skeleton skeleton-text skeleton-text-xs"></div>
        </div>
    );
};

// Table Row Skeleton
export const SkeletonTableRow = ({ columns = 5 }) => {
    return (
        <tr className="skeleton-table-row">
            {Array.from({ length: columns }).map((_, index) => (
                <td key={index}>
                    <div className="skeleton skeleton-text"></div>
                </td>
            ))}
        </tr>
    );
};

// Chart Skeleton
export const SkeletonChart = () => {
    return (
        <div className="skeleton-chart">
            <div className="skeleton skeleton-text skeleton-text-lg" style={{ width: '30%', marginBottom: '20px' }}></div>
            <div className="skeleton-chart-bars">
                <div className="skeleton skeleton-bar" style={{ height: '60%' }}></div>
                <div className="skeleton skeleton-bar" style={{ height: '80%' }}></div>
                <div className="skeleton skeleton-bar" style={{ height: '45%' }}></div>
                <div className="skeleton skeleton-bar" style={{ height: '90%' }}></div>
                <div className="skeleton skeleton-bar" style={{ height: '70%' }}></div>
            </div>
        </div>
    );
};

// Page Skeleton
export const SkeletonPage = () => {
    return (
        <div className="skeleton-page">
            <div className="skeleton skeleton-text skeleton-text-xl" style={{ width: '40%', marginBottom: '32px' }}></div>

            <div className="skeleton-grid">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>

            <div className="skeleton-section">
                <div className="skeleton skeleton-text skeleton-text-lg" style={{ width: '25%', marginBottom: '20px' }}></div>
                <div className="skeleton skeleton-chart-area"></div>
            </div>
        </div>
    );
};

// Generic Skeleton
const SkeletonLoader = ({ type = 'card', count = 1, ...props }) => {
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />);
            case 'table':
                return Array.from({ length: count }).map((_, i) => <SkeletonTableRow key={i} {...props} />);
            case 'chart':
                return <SkeletonChart />;
            case 'page':
                return <SkeletonPage />;
            default:
                return <SkeletonCard />;
        }
    };

    return <div className="skeleton-container">{renderSkeleton()}</div>;
};

export default SkeletonLoader;
