import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { formatCurrency } from '../data/mockBOEData';
import './AnalyticsPage.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AnalyticsPage = () => {
    // BOE Volume Trend (Last 6 Months)
    const volumeTrendData = {
        labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [
            {
                label: 'BOEs Filed',
                data: [1150, 1089, 1180, 1230, 1195, 1247],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    // Port-wise Distribution
    const portDistributionData = {
        labels: ['Nhava Sheva', 'Chennai', 'Kolkata', 'Mumbai'],
        datasets: [
            {
                label: 'BOE Count',
                data: [456, 312, 267, 212],
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#8b5cf6'
                ],
                borderWidth: 0
            }
        ]
    };

    // Duty Collection Trend
    const dutyTrendData = {
        labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [
            {
                label: 'Total Duty (₹ Cr)',
                data: [420, 398, 445, 465, 438, 456],
                backgroundColor: '#10b981',
                borderRadius: 8
            }
        ]
    };

    // Status Distribution
    const statusDistributionData = {
        labels: ['Cleared', 'Assessed', 'Examination', 'Pending Assessment', 'Pending OOC'],
        datasets: [
            {
                data: [1247, 1158, 89, 45, 67],
                backgroundColor: [
                    '#10b981',
                    '#3b82f6',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6'
                ],
                borderWidth: 0
            }
        ]
    };

    // Clearance Time Trend
    const clearanceTimeData = {
        labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [
            {
                label: 'Avg Clearance Time (hrs)',
                data: [38, 36, 34, 33, 31, 32],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    // Value by Origin Country
    const originCountryData = {
        labels: ['China', 'USA', 'Germany', 'Japan', 'South Korea', 'Others'],
        datasets: [
            {
                label: 'Value (₹ Cr)',
                data: [185, 142, 98, 76, 58, 123],
                backgroundColor: '#3b82f6',
                borderRadius: 8
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 12,
                        weight: 500
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 13,
                    weight: 600
                },
                bodyFont: {
                    size: 12
                },
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    font: {
                        size: 11
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 11
                    }
                }
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 12,
                        weight: 500
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12
            }
        }
    };

    return (
        <div className="analytics-page">
            <div className="analytics-header">
                <div>
                    <h1 className="page-title">Analytics & Insights</h1>
                    <p className="page-subtitle">
                        Comprehensive data analysis and trends for customs operations
                    </p>
                </div>
            </div>

            {/* KPI Summary */}
            <div className="kpi-summary">
                <div className="kpi-item">
                    <div className="kpi-icon blue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                        </svg>
                    </div>
                    <div className="kpi-details">
                        <div className="kpi-label">Total BOEs (This Month)</div>
                        <div className="kpi-value">1,247</div>
                        <div className="kpi-change positive">+4.3% vs last month</div>
                    </div>
                </div>

                <div className="kpi-item">
                    <div className="kpi-icon green">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                        </svg>
                    </div>
                    <div className="kpi-details">
                        <div className="kpi-label">Total Duty Collected</div>
                        <div className="kpi-value">₹456.78 Cr</div>
                        <div className="kpi-change positive">+4.1% vs last month</div>
                    </div>
                </div>

                <div className="kpi-item">
                    <div className="kpi-icon orange">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                    </div>
                    <div className="kpi-details">
                        <div className="kpi-label">Avg Clearance Time</div>
                        <div className="kpi-value">32 hrs</div>
                        <div className="kpi-change positive">-6.1% vs last month</div>
                    </div>
                </div>

                <div className="kpi-item">
                    <div className="kpi-icon purple">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                        </svg>
                    </div>
                    <div className="kpi-details">
                        <div className="kpi-label">Active Importers</div>
                        <div className="kpi-value">324</div>
                        <div className="kpi-change neutral">+12 new this month</div>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="charts-grid">
                {/* BOE Volume Trend */}
                <div className="chart-card large">
                    <h3 className="chart-title">BOE Volume Trend</h3>
                    <div className="chart-container">
                        <Line data={volumeTrendData} options={chartOptions} />
                    </div>
                </div>

                {/* Port Distribution */}
                <div className="chart-card">
                    <h3 className="chart-title">Port-wise Distribution</h3>
                    <div className="chart-container">
                        <Doughnut data={portDistributionData} options={doughnutOptions} />
                    </div>
                </div>

                {/* Duty Collection */}
                <div className="chart-card large">
                    <h3 className="chart-title">Duty Collection Trend</h3>
                    <div className="chart-container">
                        <Bar data={dutyTrendData} options={chartOptions} />
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="chart-card">
                    <h3 className="chart-title">Status Distribution</h3>
                    <div className="chart-container">
                        <Doughnut data={statusDistributionData} options={doughnutOptions} />
                    </div>
                </div>

                {/* Clearance Time */}
                <div className="chart-card large">
                    <h3 className="chart-title">Average Clearance Time Trend</h3>
                    <div className="chart-container">
                        <Line data={clearanceTimeData} options={chartOptions} />
                    </div>
                </div>

                {/* Origin Countries */}
                <div className="chart-card">
                    <h3 className="chart-title">Value by Origin Country</h3>
                    <div className="chart-container">
                        <Bar data={originCountryData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
