import React from 'react';
import './AnalyticsPage.css';

const AnalyticsPageSimple = () => {
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

            {/* Charts Installation Notice */}
            <div className="charts-installation-notice">
                <div className="notice-card">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    <h3>Charts Require Additional Setup</h3>
                    <p>To view interactive charts, please install the required package:</p>
                    <pre><code>npm uninstall react-chartjs
npm install react-chartjs-2</code></pre>
                    <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
                        After installation, restart the dev server and charts will appear automatically.
                    </p>
                </div>
            </div>

            {/* Data Tables as Alternative */}
            <div className="charts-grid">
                <div className="chart-card large">
                    <h3 className="chart-title">📊 BOE Volume Trend (Last 6 Months)</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>BOEs Filed</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>August</td><td>1,150</td><td className="neutral">-</td></tr>
                            <tr><td>September</td><td>1,089</td><td className="negative">-5.3%</td></tr>
                            <tr><td>October</td><td>1,180</td><td className="positive">+8.4%</td></tr>
                            <tr><td>November</td><td>1,230</td><td className="positive">+4.2%</td></tr>
                            <tr><td>December</td><td>1,195</td><td className="negative">-2.8%</td></tr>
                            <tr><td>January</td><td>1,247</td><td className="positive">+4.3%</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">🌏 Port-wise Distribution</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Port</th>
                                <th>BOEs</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Nhava Sheva</td><td>456</td><td>36.5%</td></tr>
                            <tr><td>Chennai</td><td>312</td><td>25.0%</td></tr>
                            <tr><td>Kolkata</td><td>267</td><td>21.4%</td></tr>
                            <tr><td>Mumbai</td><td>212</td><td>17.1%</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="chart-card large">
                    <h3 className="chart-title">💰 Duty Collection Trend</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Total Duty (₹ Cr)</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>August</td><td>₹420 Cr</td><td className="neutral">-</td></tr>
                            <tr><td>September</td><td>₹398 Cr</td><td className="negative">-5.2%</td></tr>
                            <tr><td>October</td><td>₹445 Cr</td><td className="positive">+11.8%</td></tr>
                            <tr><td>November</td><td>₹465 Cr</td><td className="positive">+4.5%</td></tr>
                            <tr><td>December</td><td>₹438 Cr</td><td className="negative">-5.8%</td></tr>
                            <tr><td>January</td><td>₹456.78 Cr</td><td className="positive">+4.3%</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">📋 Status Distribution</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Cleared</td><td>1,247</td></tr>
                            <tr><td>Assessed</td><td>1,158</td></tr>
                            <tr><td>Under Examination</td><td>89</td></tr>
                            <tr><td>Pending Assessment</td><td>45</td></tr>
                            <tr><td>Pending OOC</td><td>67</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPageSimple;
