import React, { useState, useMemo } from 'react';
import { useCountUp } from '../../utils/useCountUp';
import { mockBOEs, formatCurrency } from '../../data/mockBOEData';
import BOEDetail from '../BOEDetail/BOEDetail';
import './BOEDashboard.css';

const BOEDashboard = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedCompany, setSelectedCompany] = useState('all');
    const [selectedPort, setSelectedPort] = useState('all');
    const [dateRange, setDateRange] = useState('thisMonth');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBE, setSelectedBE] = useState(null);

    // Filter BOEs based on selected filters
    const filteredBOEs = useMemo(() => {
        let filtered = [...mockBOEs];

        // Filter by status
        if (selectedFilter !== 'all') {
            const statusMap = {
                'pending': 'Pending Assessment',
                'examination': 'Under Examination',
                'assessed': 'Assessed',
                'cleared': 'Cleared'
            };
            filtered = filtered.filter(boe => boe.status === statusMap[selectedFilter]);
        }

        // Filter by company
        if (selectedCompany !== 'all') {
            filtered = filtered.filter(boe => {
                const companyNames = {
                    'tech_imports': 'Tech Imports Private Limited',
                    'global_trade': 'Global Trade Corporation',
                    'ocean_freight': 'Ocean Freight Company',
                    'eastern_goods': 'Eastern Goods Pvt Ltd'
                };
                return boe.importer === companyNames[selectedCompany];
            });
        }

        // Filter by port
        if (selectedPort !== 'all') {
            filtered = filtered.filter(boe => boe.port_code === selectedPort);
        }

        // Filter by search term
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(boe =>
                boe.be_no.toLowerCase().includes(search) ||
                boe.importer.toLowerCase().includes(search) ||
                boe.iec_no.toLowerCase().includes(search)
            );
        }

        return filtered;
    }, [selectedFilter, selectedCompany, selectedPort, searchTerm]);

    // Calculate statistics from filtered data
    const stats = useMemo(() => {
        const total = filteredBOEs.length;
        const totalValue = filteredBOEs.reduce((sum, boe) => sum + boe.assessable_value, 0);
        const assessed = filteredBOEs.filter(boe => boe.status === 'Assessed').length;
        const pending = filteredBOEs.filter(boe => boe.status === 'Pending Assessment').length;

        return { total, totalValue, assessed, pending };
    }, [filteredBOEs]);

    // Animated statistics
    const totalBOEs = useCountUp(stats.total, 2000, 500);
    const totalValue = useCountUp(Math.floor(stats.totalValue / 1000000), 2000, 600);
    const pendingBOEs = useCountUp(stats.pending, 2000, 700);
    const assessedBOEs = useCountUp(stats.assessed, 2000, 800);

    const companies = [
        { id: 'all', name: 'All Companies' },
        { id: 'tech_imports', name: 'Tech Imports Ltd' },
        { id: 'global_trade', name: 'Global Trade Corp' },
        { id: 'ocean_freight', name: 'Ocean Freight Co' },
        { id: 'eastern_goods', name: 'Eastern Goods Pvt Ltd' }
    ];

    const ports = [
        { code: 'all', name: 'All Ports' },
        { code: 'INNSA', name: 'Nhava Sheva' },
        { code: 'INMAA', name: 'Chennai' },
        { code: 'INCCU', name: 'Kolkata' },
        { code: 'INMUN', name: 'Mumbai' }
    ];

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredBOEs.length / itemsPerPage);

    const paginatedBOEs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredBOEs.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredBOEs, currentPage]);

    // Reset to page 1 when filters change
    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
        setCurrentPage(1);
    };

    const portStatistics = [
        { port: 'Nhava Sheva', code: 'INNSA', count: 456, value: 18500000, percentage: 36.5 },
        { port: 'Chennai', code: 'INMAA', count: 312, value: 12300000, percentage: 25.0 },
        { port: 'Kolkata', code: 'INCCU', count: 267, value: 9800000, percentage: 21.4 },
        { port: 'Mumbai', code: 'INMUN', count: 212, value: 7200000, percentage: 17.1 }
    ];

    const dutyBreakdown = [
        { type: 'Basic Customs Duty', amount: 4567890, percentage: 42 },
        { type: 'IGST', amount: 3456789, percentage: 32 },
        { type: 'Social Welfare Surcharge', amount: 1234567, percentage: 11 },
        { type: 'Compensation Cess', amount: 987654, percentage: 9 },
        { type: 'Anti-Dumping Duty', amount: 654321, percentage: 6 }
    ];

    const getStatusClass = (status) => {
        const statusMap = {
            'Assessed': 'status-assessed',
            'Under Examination': 'status-examination',
            'Pending Assessment': 'status-pending',
            'Pending OOC': 'status-examination',
            'Cleared': 'status-cleared',
            'Rejected': 'status-pending'
        };
        return statusMap[status] || 'status-default';
    };

    // Export to CSV function
    const exportToCSV = () => {
        const headers = ['BE Number', 'Company', 'IEC No', 'Port', 'Date', 'Items', 'Assessable Value', 'Total Duty', 'Status'];
        const csvData = filteredBOEs.map(boe => [
            boe.be_no,
            boe.importer,
            boe.iec_no,
            boe.port_code,
            boe.be_date,
            boe.items_count,
            boe.assessable_value,
            boe.total_duty,
            boe.status
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `BOE_Export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="boe-dashboard">
            {/* Admin Filters Section */}
            <div className="admin-filters-card">
                <div className="filters-header">
                    <h2 className="filters-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Admin Filters
                    </h2>
                </div>

                <div className="filters-grid">
                    <div className="filter-group">
                        <label className="filter-label">Search</label>
                        <input
                            type="text"
                            className="filter-select"
                            placeholder="Search BE No, Company, IEC..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Company</label>
                        <select
                            className="filter-select"
                            value={selectedCompany}
                            onChange={handleFilterChange(setSelectedCompany)}
                        >
                            {companies.map(company => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Port</label>
                        <select
                            className="filter-select"
                            value={selectedPort}
                            onChange={handleFilterChange(setSelectedPort)}
                        >
                            {ports.map(port => (
                                <option key={port.code} value={port.code}>
                                    {port.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Date Range</label>
                        <select
                            className="filter-select"
                            value={dateRange}
                            onChange={handleFilterChange(setDateRange)}
                        >
                            <option value="today">Today</option>
                            <option value="thisWeek">This Week</option>
                            <option value="thisMonth">This Month</option>
                            <option value="lastMonth">Last Month</option>
                            <option value="thisYear">This Year</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Status</label>
                        <select
                            className="filter-select"
                            value={selectedFilter}
                            onChange={handleFilterChange(setSelectedFilter)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending Assessment</option>
                            <option value="examination">Under Examination</option>
                            <option value="assessed">Assessed</option>
                            <option value="cleared">Cleared</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-icon-wrapper blue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 2v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-4V2h-2v2H9V2zm10 18H5V10h14v10z"/>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Total BOEs</div>
                        <div className="stat-value">{totalBOEs}</div>
                        <div className="stat-change positive">+12.5% from last month</div>
                    </div>
                </div>

                <div className="stat-card" style={{ animationDelay: '0.2s' }}>
                    <div className="stat-icon-wrapper green">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Total Value (Cr)</div>
                        <div className="stat-value">₹{totalValue}</div>
                        <div className="stat-change positive">+8.3% from last month</div>
                    </div>
                </div>

                <div className="stat-card" style={{ animationDelay: '0.3s' }}>
                    <div className="stat-icon-wrapper orange">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Assessed BOEs</div>
                        <div className="stat-value">{assessedBOEs}</div>
                        <div className="stat-change neutral">92.9% completion rate</div>
                    </div>
                </div>

                <div className="stat-card" style={{ animationDelay: '0.4s' }}>
                    <div className="stat-icon-wrapper red">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Pending Assessment</div>
                        <div className="stat-value">{pendingBOEs}</div>
                        <div className="stat-change negative">Requires attention</div>
                    </div>
                </div>
            </div>

            {/* Port Statistics */}
            <div className="port-stats-card">
                <h3 className="card-title">Port-wise Distribution</h3>
                <div className="port-stats-grid">
                    {portStatistics.map((port, index) => (
                        <div
                            key={port.code}
                            className="port-stat-item"
                            style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                        >
                            <div className="port-stat-header">
                                <div className="port-name">{port.port}</div>
                                <div className="port-code">{port.code}</div>
                            </div>
                            <div className="port-stat-value">{port.count} BOEs</div>
                            <div className="port-stat-amount">{formatCurrency(port.value)}</div>
                            <div className="port-progress-bar">
                                <div
                                    className="port-progress-fill"
                                    style={{
                                        '--target-width': `${port.percentage}%`,
                                        animationDelay: `${1.2 + index * 0.1}s`
                                    }}
                                ></div>
                            </div>
                            <div className="port-percentage">{port.percentage}% of total</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent BOEs Table */}
            <div className="recent-boes-card">
                <div className="card-header">
                    <h3 className="card-title">
                        Bill of Entries ({filteredBOEs.length} {filteredBOEs.length === 1 ? 'result' : 'results'})
                    </h3>
                    <button className="export-btn" onClick={exportToCSV}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Export CSV
                    </button>
                </div>

                {filteredBOEs.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ margin: '0 auto 16px' }}>
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        <p>No BOEs found matching your filters</p>
                    </div>
                ) : (
                    <>
                        <div className="table-container">
                            <table className="boe-table">
                                <thead>
                                    <tr>
                                        <th>BE Number</th>
                                        <th>Company</th>
                                        <th>Port</th>
                                        <th>Date</th>
                                        <th>Items</th>
                                        <th>Value</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedBOEs.map((boe, index) => (
                                        <tr key={boe.be_no} style={{ animationDelay: `${1.0 + index * 0.1}s` }}>
                                            <td className="be-number">{boe.be_no}</td>
                                            <td>{boe.importer}</td>
                                            <td><code className="port-code-badge">{boe.port_code}</code></td>
                                            <td>{new Date(boe.be_date).toLocaleDateString('en-IN')}</td>
                                            <td>{boe.items_count}</td>
                                            <td className="value-cell">{formatCurrency(boe.assessable_value)}</td>
                                            <td>
                                                <span className={`status-badge ${getStatusClass(boe.status)}`}>
                                                    {boe.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="action-btn" onClick={() => setSelectedBE(boe.be_no)}>
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                >
                                    ← Previous
                                </button>
                                <div className="pagination-info">
                                    Page {currentPage} of {totalPages}
                                </div>
                                <button
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Duty Breakdown */}
            <div className="duty-breakdown-card">
                <h3 className="card-title">Duty Breakdown (This Month)</h3>
                <div className="duty-list">
                    {dutyBreakdown.map((duty, index) => (
                        <div
                            key={duty.type}
                            className="duty-item"
                            style={{ animationDelay: `${1.5 + index * 0.1}s` }}
                        >
                            <div className="duty-info">
                                <div className="duty-type">{duty.type}</div>
                                <div className="duty-amount">{formatCurrency(duty.amount)}</div>
                            </div>
                            <div className="duty-progress">
                                <div
                                    className="duty-progress-fill"
                                    style={{
                                        '--target-width': `${duty.percentage}%`,
                                        animationDelay: `${2.0 + index * 0.1}s`
                                    }}
                                ></div>
                            </div>
                            <div className="duty-percentage">{duty.percentage}%</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* BOE Detail Modal */}
            {selectedBE && (
                <BOEDetail
                    beNumber={selectedBE}
                    onClose={() => setSelectedBE(null)}
                />
            )}
        </div>
    );
};

export default BOEDashboard;
