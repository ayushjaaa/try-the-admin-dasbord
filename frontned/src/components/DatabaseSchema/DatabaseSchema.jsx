import React, { useState } from 'react';
import { useCountUp } from '../../utils/useCountUp';
import './DatabaseSchema.css';

const DatabaseSchema = () => {
    const [selectedTable, setSelectedTable] = useState('boe_header');

    // Animated stats
    const totalTables = useCountUp(8, 2000, 500);
    const totalColumns = useCountUp(120, 2000, 600);
    const relationships = useCountUp(15, 2000, 700);

    const tables = {
        boe_header: {
            name: 'boe_header',
            description: 'Main BOE header with business key be_no',
            primaryKey: 'be_no',
            color: '#3b82f6',
            columns: [
                { name: 'be_no', type: 'VARCHAR(30)', constraint: 'PRIMARY KEY', description: 'Bill of Entry Number' },
                { name: 'year', type: 'VARCHAR(4)', constraint: '', description: 'Year of entry' },
                { name: 'iec_no', type: 'VARCHAR(20)', constraint: '', description: 'Importer-Exporter Code' },
                { name: 'gst_no', type: 'VARCHAR(20)', constraint: '', description: 'GST Number' },
                { name: 'port_code', type: 'VARCHAR(10)', constraint: '', description: 'Port Code' },
                { name: 'be_date', type: 'DATE', constraint: '', description: 'BOE Date' },
                { name: 'pkg', type: 'INTEGER', constraint: '', description: 'Number of packages' },
                { name: 'g_wt', type: 'NUMERIC(15,3)', constraint: '', description: 'Gross Weight' },
                { name: 'ex_rate', type: 'NUMERIC(12,6)', constraint: '', description: 'Exchange Rate' },
                { name: 'no_of_invoices', type: 'INTEGER', constraint: '', description: 'Invoice Count' },
                { name: 'total_items', type: 'INTEGER', constraint: '', description: 'Total Line Items' },
                { name: 'submission', type: 'TIMESTAMP', constraint: '', description: 'Submission Time' },
                { name: 'assessment', type: 'TIMESTAMP', constraint: '', description: 'Assessment Time' },
                { name: 'examination', type: 'TIMESTAMP', constraint: '', description: 'Examination Time' }
            ]
        },
        boe_items: {
            name: 'boe_items',
            description: 'Line items for each BOE',
            primaryKey: 'id',
            foreignKeys: ['be_no → boe_header'],
            color: '#10b981',
            columns: [
                { name: 'id', type: 'BIGSERIAL', constraint: 'PRIMARY KEY', description: 'Auto-increment ID' },
                { name: 'be_no', type: 'VARCHAR(30)', constraint: 'FOREIGN KEY', description: 'References BOE Header' },
                { name: 'item_sno', type: 'INTEGER', constraint: '', description: 'Item Serial Number' },
                { name: 'hs_code', type: 'VARCHAR(10)', constraint: '', description: 'HS Code' },
                { name: 'description', type: 'TEXT', constraint: '', description: 'Item Description' },
                { name: 'quantity', type: 'NUMERIC(15,3)', constraint: '', description: 'Quantity' },
                { name: 'unit', type: 'VARCHAR(10)', constraint: '', description: 'Unit of Measure' },
                { name: 'rate', type: 'NUMERIC(15,2)', constraint: '', description: 'Rate' },
                { name: 'value', type: 'NUMERIC(15,2)', constraint: '', description: 'Item Value' },
                { name: 'assessable_value', type: 'NUMERIC(15,2)', constraint: '', description: 'Assessable Value' }
            ]
        },
        boe_duties: {
            name: 'boe_duties',
            description: 'Duty details per BOE',
            primaryKey: 'id',
            foreignKeys: ['be_no → boe_header'],
            color: '#f59e0b',
            columns: [
                { name: 'id', type: 'BIGSERIAL', constraint: 'PRIMARY KEY', description: 'Auto-increment ID' },
                { name: 'be_no', type: 'VARCHAR(30)', constraint: 'FOREIGN KEY', description: 'References BOE Header' },
                { name: 'duty_type', type: 'VARCHAR(20)', constraint: '', description: 'Type of Duty' },
                { name: 'duty_amount', type: 'NUMERIC(15,2)', constraint: '', description: 'Duty Amount' },
                { name: 'cess_amount', type: 'NUMERIC(15,2)', constraint: '', description: 'Cess Amount' },
                { name: 'igst', type: 'NUMERIC(15,2)', constraint: '', description: 'IGST Amount' },
                { name: 'compensation_cess', type: 'NUMERIC(15,2)', constraint: '', description: 'Compensation Cess' }
            ]
        },
        boe_containers: {
            name: 'boe_containers',
            description: 'Container tracking',
            primaryKey: 'id',
            foreignKeys: ['be_no → boe_header'],
            color: '#8b5cf6',
            columns: [
                { name: 'id', type: 'BIGSERIAL', constraint: 'PRIMARY KEY', description: 'Auto-increment ID' },
                { name: 'be_no', type: 'VARCHAR(30)', constraint: 'FOREIGN KEY', description: 'References BOE Header' },
                { name: 'container_no', type: 'VARCHAR(20)', constraint: '', description: 'Container Number' },
                { name: 'container_size', type: 'VARCHAR(10)', constraint: '', description: 'Container Size' },
                { name: 'seal_no', type: 'VARCHAR(20)', constraint: '', description: 'Seal Number' }
            ]
        }
    };

    const tableList = Object.keys(tables);

    return (
        <div className="database-schema-section">
            <div className="schema-header">
                <div className="schema-title-section">
                    <h2 className="schema-title">BOE Database Design</h2>
                    <p className="schema-subtitle">PostgreSQL Schema - be_no as Primary Business Key</p>
                </div>
                <div className="schema-stats">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <line x1="9" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="2"/>
                                <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </div>
                        <div className="stat-info">
                            <div className="stat-value">{totalTables}</div>
                            <div className="stat-label">Tables</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div className="stat-info">
                            <div className="stat-value">{totalColumns}</div>
                            <div className="stat-label">Columns</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div className="stat-info">
                            <div className="stat-value">{relationships}</div>
                            <div className="stat-label">Relations</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="schema-content">
                <div className="tables-sidebar">
                    <h3 className="sidebar-title">Database Tables</h3>
                    <div className="table-list">
                        {tableList.map((tableName, index) => (
                            <div
                                key={tableName}
                                className={`table-item ${selectedTable === tableName ? 'active' : ''}`}
                                onClick={() => setSelectedTable(tableName)}
                                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                            >
                                <div
                                    className="table-color-indicator"
                                    style={{ background: tables[tableName].color }}
                                ></div>
                                <div className="table-item-info">
                                    <div className="table-item-name">{tableName}</div>
                                    <div className="table-item-key">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7 10l5 5 5-5z"/>
                                        </svg>
                                        {tables[tableName].primaryKey}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="table-details">
                    {selectedTable && (
                        <>
                            <div className="table-details-header">
                                <div className="table-badge" style={{ background: tables[selectedTable].color }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="table-details-title">{tables[selectedTable].name}</h3>
                                    <p className="table-details-description">{tables[selectedTable].description}</p>
                                </div>
                            </div>

                            {tables[selectedTable].foreignKeys && (
                                <div className="foreign-keys-section">
                                    <div className="fk-label">Foreign Keys:</div>
                                    <div className="fk-list">
                                        {tables[selectedTable].foreignKeys.map((fk, idx) => (
                                            <span key={idx} className="fk-badge">{fk}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="columns-table">
                                <div className="columns-table-header">
                                    <div className="col-name">Column Name</div>
                                    <div className="col-type">Data Type</div>
                                    <div className="col-constraint">Constraint</div>
                                    <div className="col-description">Description</div>
                                </div>
                                <div className="columns-table-body">
                                    {tables[selectedTable].columns.map((col, idx) => (
                                        <div
                                            key={idx}
                                            className="column-row"
                                            style={{ animationDelay: `${idx * 0.05}s` }}
                                        >
                                            <div className="col-name">
                                                {col.constraint.includes('PRIMARY') && (
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                    </svg>
                                                )}
                                                {col.constraint.includes('FOREIGN') && (
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
                                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                                    </svg>
                                                )}
                                                <span className={col.constraint ? 'highlight' : ''}>{col.name}</span>
                                            </div>
                                            <div className="col-type">
                                                <code>{col.type}</code>
                                            </div>
                                            <div className="col-constraint">
                                                {col.constraint && (
                                                    <span className={`constraint-badge ${col.constraint.toLowerCase().replace(' ', '-')}`}>
                                                        {col.constraint}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-description">{col.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="design-principles">
                                <h4 className="principles-title">Design Principles</h4>
                                <ul className="principles-list">
                                    <li><strong>be_no</strong> is the primary identifier across the system</li>
                                    <li>Surrogate keys via <code>BIGSERIAL</code> for child tables</li>
                                    <li>PostgreSQL 12+ compatible</li>
                                    <li>Optimized for analytics, audit, and reconciliation</li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DatabaseSchema;
