import React from 'react';
import { useCountUp } from '../../utils/useCountUp';
import { kpiData, statusPipeline, mockBOEs, alertsSummary, formatCurrency, getStatusColor, getRelativeTime } from '../../data/mockBOEData';
import './BOEOverview.css';

const BOEOverview = () => {
    // Animated KPIs
    const totalBOEs = useCountUp(kpiData.total_boes, 2000, 500);
    const pendingClearance = useCountUp(kpiData.pending_clearance, 2000, 600);
    const dutyCrores = useCountUp(Math.floor(kpiData.total_duty_collected / 10000000), 2000, 700);
    const avgClearanceTime = useCountUp(kpiData.avg_clearance_time, 2000, 800);

    // Get recent 5 BOEs
    const recentBOEs = mockBOEs.slice(0, 5);

    return (
        <div className="boe-overview">
            {/* Critical Alerts Banner */}
            {(alertsSummary.pending_over_48hrs > 0 || alertsSummary.payment_mismatches > 0) && (
                <div className="alerts-banner">
                    <div className="alerts-content">
                        {alertsSummary.pending_over_48hrs > 0 && (
                            <div className="alert-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                </svg>
                                <span>{alertsSummary.pending_over_48hrs} BOEs Pending &gt; 48hrs</span>
                            </div>
                        )}
                        {alertsSummary.payment_mismatches > 0 && (
                            <div className="alert-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                <span>{alertsSummary.payment_mismatches} Payment Mismatches</span>
                            </div>
                        )}
                        <button className="view-alerts-btn">View All Alerts →</button>
                    </div>
                </div>
            )}

            {/* KPI Cards */}
            <div className="kpi-grid">
                <div className="kpi-card" style={{ animationDelay: '0.1s' }}>
                    <div className="kpi-icon blue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10z"/>
                        </svg>
                    </div>
                    <div className="kpi-content">
                        <div className="kpi-label">Total BOEs (This Month)</div>
                        <div className="kpi-value">{totalBOEs.toLocaleString('en-IN')}</div>
                        <div className="kpi-trend positive">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                                <polyline points="17 6 23 6 23 12"/>
                            </svg>
                            +{kpiData.total_boes_trend}% from last month
                        </div>
                    </div>
                </div>

                <div className="kpi-card" style={{ animationDelay: '0.2s' }}>
                    <div className="kpi-icon orange">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                    </div>
                    <div className="kpi-content">
                        <div className="kpi-label">Pending Clearance</div>
                        <div className="kpi-value">{pendingClearance}</div>
                        <div className="kpi-meta">Avg wait: {kpiData.avg_wait_time}hrs</div>
                    </div>
                </div>

                <div className="kpi-card" style={{ animationDelay: '0.3s' }}>
                    <div className="kpi-icon green">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                        </svg>
                    </div>
                    <div className="kpi-content">
                        <div className="kpi-label">Total Duty Collected</div>
                        <div className="kpi-value">₹{dutyCrores} Cr</div>
                        <div className="kpi-progress">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{
                                        '--progress-width': `${(kpiData.total_duty_collected / kpiData.duty_target) * 100}%`
                                    }}
                                ></div>
                            </div>
                            <span className="progress-text">{Math.floor((kpiData.total_duty_collected / kpiData.duty_target) * 100)}% of target</span>
                        </div>
                    </div>
                </div>

                <div className="kpi-card" style={{ animationDelay: '0.4s' }}>
                    <div className={`kpi-icon ${avgClearanceTime <= 24 ? 'green' : avgClearanceTime <= 48 ? 'orange' : 'red'}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                    </div>
                    <div className="kpi-content">
                        <div className="kpi-label">Avg Clearance Time</div>
                        <div className="kpi-value">{avgClearanceTime}hrs</div>
                        <div className={`kpi-meta ${avgClearanceTime <= 24 ? 'green' : avgClearanceTime <= 48 ? 'orange' : 'red'}`}>
                            {avgClearanceTime <= 24 ? 'Excellent' : avgClearanceTime <= 48 ? 'Good' : 'Needs Attention'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Pipeline */}
            <div className="status-pipeline-card">
                <h3 className="section-title">Processing Pipeline</h3>
                <div className="pipeline-stages">
                    {statusPipeline.map((stage, index) => (
                        <div
                            key={stage.stage}
                            className="pipeline-stage"
                            style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                        >
                            <div className="stage-header">
                                <div className="stage-name">{stage.stage}</div>
                                <div className="stage-count">{stage.count}</div>
                            </div>
                            <div className="stage-bar">
                                <div
                                    className="stage-bar-fill"
                                    style={{
                                        backgroundColor: stage.color,
                                        '--bar-width': `${(stage.count / Math.max(...statusPipeline.map(s => s.count))) * 100}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="overview-two-col">
                {/* Recent BOEs Table */}
                <div className="recent-boes-card">
                    <div className="card-header">
                        <h3 className="section-title">Recent BOEs</h3>
                        <button className="view-all-btn">View All →</button>
                    </div>
                    <div className="compact-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>BE Number</th>
                                    <th>Importer</th>
                                    <th>Port</th>
                                    <th align="right">Value</th>
                                    <th>Status</th>
                                    <th align="right">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBOEs.map((boe, index) => (
                                    <tr key={boe.be_no} style={{ animationDelay: `${1.2 + index * 0.1}s` }}>
                                        <td className="be-number">{boe.be_no}</td>
                                        <td className="importer-name">{boe.importer}</td>
                                        <td><code className="port-badge">{boe.port_code}</code></td>
                                        <td align="right" className="value-cell">{formatCurrency(boe.assessable_value)}</td>
                                        <td>
                                            <span className={`status-pill status-${getStatusColor(boe.status)}`}>
                                                {boe.status}
                                            </span>
                                        </td>
                                        <td align="right" className="time-cell">{getRelativeTime(boe.last_updated)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions-card">
                    <h3 className="section-title">Quick Actions</h3>
                    <div className="actions-list">
                        <button className="action-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                            <span>Advanced Search</span>
                        </button>
                        <button className="action-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                            </svg>
                            <span>Import BOE Data</span>
                        </button>
                        <button className="action-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                            </svg>
                            <span>Generate Report</span>
                        </button>
                        <button className="action-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m-2.8 2.8-4.2 4.2m13.2-.8-4.2-4.2m-2.8-2.8-4.2-4.2"/>
                            </svg>
                            <span>System Settings</span>
                        </button>
                    </div>

                    <div className="pending-approvals">
                        <div className="approval-header">
                            <h4>Pending Approvals</h4>
                            <span className="count-badge">{alertsSummary.svb_pending}</span>
                        </div>
                        <div className="approval-list">
                            <div className="approval-item">
                                <span className="approval-label">SVB Documents</span>
                                <span className="approval-count">{alertsSummary.svb_pending}</span>
                            </div>
                            <div className="approval-item">
                                <span className="approval-label">License Verification</span>
                                <span className="approval-count">2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BOEOverview;
