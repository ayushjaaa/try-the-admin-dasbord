import React, { useState, useMemo } from 'react';
import { mockBOEs, formatCurrency, formatDate } from '../data/mockBOEData';
import BOEDetail from '../components/BOEDetail/BOEDetail';
import './BOETrackerPage.css';

const BOETrackerPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('all');
    const [selectedPort, setSelectedPort] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [sortField, setSortField] = useState('be_date');
    const [sortDirection, setSortDirection] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBE, setSelectedBE] = useState(null);
    const itemsPerPage = 10;

    // Filter and sort BOEs
    const filteredAndSortedBOEs = useMemo(() => {
        let filtered = [...mockBOEs];

        // Apply filters
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(boe =>
                boe.be_no.toLowerCase().includes(search) ||
                boe.importer.toLowerCase().includes(search) ||
                boe.iec_no.toLowerCase().includes(search)
            );
        }

        if (selectedCompany !== 'all') {
            filtered = filtered.filter(boe => boe.importer.includes(selectedCompany));
        }

        if (selectedPort !== 'all') {
            filtered = filtered.filter(boe => boe.port_code === selectedPort);
        }

        if (selectedStatus !== 'all') {
            filtered = filtered.filter(boe => boe.status === selectedStatus);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            // Handle different data types
            if (sortField === 'be_date' || sortField === 'last_updated') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            } else if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return filtered;
    }, [mockBOEs, searchTerm, selectedCompany, selectedPort, selectedStatus, sortField, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedBOEs.length / itemsPerPage);
    const paginatedBOEs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedBOEs.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredAndSortedBOEs, currentPage]);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getStatusClass = (status) => {
        const statusMap = {
            'Assessed': 'status-assessed',
            'Under Examination': 'status-examination',
            'Pending Assessment': 'status-pending',
            'Pending OOC': 'status-ooc',
            'Cleared': 'status-cleared',
            'Rejected': 'status-rejected'
        };
        return statusMap[status] || 'status-default';
    };

    const exportToCSV = () => {
        const headers = ['BE Number', 'Company', 'IEC No', 'Port', 'Date', 'Items', 'Assessable Value', 'Total Duty', 'Status'];
        const csvData = filteredAndSortedBOEs.map(boe => [
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
        link.setAttribute('download', `BOE_Tracker_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="tracker-page">
            <div className="tracker-header">
                <div>
                    <h1 className="page-title">BOE Tracker</h1>
                    <p className="page-subtitle">
                        View and manage all Bills of Entry with advanced filtering and search
                    </p>
                </div>
                <button className="export-btn-large" onClick={exportToCSV}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Export to CSV
                </button>
            </div>

            {/* Advanced Filters */}
            <div className="tracker-filters">
                <div className="filter-row">
                    <div className="search-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by BE No, Company, or IEC..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        {searchTerm && (
                            <button className="clear-search" onClick={() => setSearchTerm('')}>×</button>
                        )}
                    </div>

                    <select
                        value={selectedCompany}
                        onChange={(e) => {
                            setSelectedCompany(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="all">All Companies</option>
                        <option value="Tech Imports">Tech Imports Pvt Ltd</option>
                        <option value="Global Trade">Global Trade Corp</option>
                        <option value="Ocean Freight">Ocean Freight Co</option>
                        <option value="Eastern Goods">Eastern Goods Pvt Ltd</option>
                    </select>

                    <select
                        value={selectedPort}
                        onChange={(e) => {
                            setSelectedPort(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="all">All Ports</option>
                        <option value="INNSA">INNSA - Nhava Sheva</option>
                        <option value="INMAA">INMAA - Chennai</option>
                        <option value="INCCU">INCCU - Kolkata</option>
                        <option value="INMUN">INMUN - Mumbai</option>
                    </select>

                    <select
                        value={selectedStatus}
                        onChange={(e) => {
                            setSelectedStatus(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="all">All Status</option>
                        <option value="Pending Assessment">Pending Assessment</option>
                        <option value="Under Examination">Under Examination</option>
                        <option value="Pending OOC">Pending OOC</option>
                        <option value="Assessed">Assessed</option>
                        <option value="Cleared">Cleared</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="results-info">
                    Showing {paginatedBOEs.length} of {filteredAndSortedBOEs.length} BOEs
                </div>
            </div>

            {/* BOE Table */}
            <div className="tracker-table-card">
                {filteredAndSortedBOEs.length === 0 ? (
                    <div className="empty-state">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        <h3>No BOEs Found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <>
                        <div className="table-wrapper">
                            <table className="tracker-table">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('be_no')} className="sortable">
                                            BE Number
                                            {sortField === 'be_no' && (
                                                <span className="sort-icon">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </th>
                                        <th onClick={() => handleSort('importer')} className="sortable">
                                            Importer
                                            {sortField === 'importer' && (
                                                <span className="sort-icon">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </th>
                                        <th onClick={() => handleSort('port_code')} className="sortable">
                                            Port
                                            {sortField === 'port_code' && (
                                                <span className="sort-icon">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </th>
                                        <th onClick={() => handleSort('be_date')} className="sortable">
                                            Date
                                            {sortField === 'be_date' && (
                                                <span className="sort-icon">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </th>
                                        <th onClick={() => handleSort('assessable_value')} className="sortable">
                                            Value
                                            {sortField === 'assessable_value' && (
                                                <span className="sort-icon">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </th>
                                        <th onClick={() => handleSort('total_duty')} className="sortable">
                                            Duty
                                            {sortField === 'total_duty' && (
                                                <span className="sort-icon">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </th>
                                        <th onClick={() => handleSort('status')} className="sortable">
                                            Status
                                            {sortField === 'status' && (
                                                <span className="sort-icon">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedBOEs.map((boe) => (
                                        <tr key={boe.be_no}>
                                            <td className="be-number">{boe.be_no}</td>
                                            <td className="importer-cell">{boe.importer}</td>
                                            <td><code className="port-badge">{boe.port_code}</code></td>
                                            <td>{formatDate(boe.be_date)}</td>
                                            <td className="amount-cell">{formatCurrency(boe.assessable_value)}</td>
                                            <td className="amount-cell">{formatCurrency(boe.total_duty)}</td>
                                            <td>
                                                <span className={`status-badge ${getStatusClass(boe.status)}`}>
                                                    {boe.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="view-btn"
                                                    onClick={() => setSelectedBE(boe.be_no)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                >
                                    ‹‹ First
                                </button>
                                <button
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                >
                                    ‹ Previous
                                </button>
                                <div className="pagination-info">
                                    Page {currentPage} of {totalPages}
                                </div>
                                <button
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next ›
                                </button>
                                <button
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                >
                                    Last ››
                                </button>
                            </div>
                        )}
                    </>
                )}
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

export default BOETrackerPage;
