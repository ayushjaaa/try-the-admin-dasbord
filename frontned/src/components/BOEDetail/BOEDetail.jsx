import React, { useState } from 'react';
import { mockBOEs, formatCurrency, formatDate } from '../../data/mockBOEData';
import './BOEDetail.css';

const BOEDetail = ({ beNumber, onClose }) => {
    const [activeTab, setActiveTab] = useState('summary');

    // Find the BOE data
    const boe = mockBOEs.find(b => b.be_no === beNumber);

    if (!boe) {
        return (
            <div className="boe-detail-overlay" onClick={onClose}>
                <div className="boe-detail-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>BOE Not Found</h2>
                        <button className="close-btn" onClick={onClose}>×</button>
                    </div>
                    <p>BOE with number {beNumber} was not found.</p>
                </div>
            </div>
        );
    }

    // Mock invoice data
    const invoices = [
        {
            invoice_no: 'INV2024/001',
            invoice_date: '2024-01-05',
            supplier: 'Global Electronics Ltd',
            country: boe.origin_country,
            value: boe.assessable_value * 0.6,
            currency: 'USD'
        },
        {
            invoice_no: 'INV2024/002',
            invoice_date: '2024-01-06',
            supplier: 'Tech Components Inc',
            country: boe.origin_country,
            value: boe.assessable_value * 0.4,
            currency: 'USD'
        }
    ];

    // Mock line items
    const lineItems = [
        {
            sr_no: 1,
            hs_code: '8471.30.00',
            description: 'Laptop Computers - 15.6 inch Display',
            quantity: 50,
            unit: 'NOS',
            unit_price: 45000,
            assessable_value: 2250000,
            duty_rate: 20.0,
            igst_rate: 18.0
        },
        {
            sr_no: 2,
            hs_code: '8471.60.00',
            description: 'Computer Keyboard - Wireless',
            quantity: 100,
            unit: 'NOS',
            unit_price: 1500,
            assessable_value: 150000,
            duty_rate: 15.0,
            igst_rate: 18.0
        },
        {
            sr_no: 3,
            hs_code: '8471.60.00',
            description: 'Computer Mouse - Optical',
            quantity: 100,
            unit: 'NOS',
            unit_price: 800,
            assessable_value: 80000,
            duty_rate: 15.0,
            igst_rate: 18.0
        }
    ];

    // Mock duty details
    const dutyDetails = [
        { type: 'Basic Customs Duty (BCD)', rate: '10%', amount: boe.total_duty * 0.35 },
        { type: 'Integrated GST (IGST)', rate: '18%', amount: boe.total_duty * 0.45 },
        { type: 'Social Welfare Surcharge', rate: '10% on BCD', amount: boe.total_duty * 0.10 },
        { type: 'Compensation Cess', rate: '5%', amount: boe.total_duty * 0.08 },
        { type: 'Anti-Dumping Duty', rate: 'Variable', amount: boe.total_duty * 0.02 }
    ];

    // Mock timeline
    const timeline = [
        { date: boe.be_date, time: '09:30', event: 'BOE Submitted', status: 'completed', user: 'System' },
        { date: boe.be_date, time: '10:15', event: 'Document Verification', status: 'completed', user: 'Officer A. Kumar' },
        { date: boe.be_date, time: '14:30', event: 'Assessment Started', status: 'completed', user: 'Officer B. Sharma' },
        { date: boe.last_updated.split('T')[0], time: '11:00', event: 'Duty Calculated', status: 'completed', user: 'System' },
        { date: boe.last_updated.split('T')[0], time: '14:30', event: 'Status: ' + boe.status, status: boe.status === 'Cleared' ? 'completed' : 'in-progress', user: 'Officer B. Sharma' }
    ];

    const tabs = [
        { id: 'summary', label: 'Summary', icon: '📋' },
        { id: 'invoices', label: 'Invoices', icon: '📄' },
        { id: 'items', label: 'Line Items', icon: '📦' },
        { id: 'duties', label: 'Duty Details', icon: '💰' },
        { id: 'timeline', label: 'Timeline', icon: '📅' }
    ];

    return (
        <div className="boe-detail-overlay" onClick={onClose}>
            <div className="boe-detail-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <h2>Bill of Entry Details</h2>
                        <div className="be-number-large">{boe.be_no}</div>
                    </div>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                {/* Status Bar */}
                <div className={`status-bar status-${boe.status.toLowerCase().replace(/ /g, '-')}`}>
                    <div className="status-indicator"></div>
                    <span>Status: {boe.status}</span>
                </div>

                {/* Tabs */}
                <div className="detail-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'summary' && (
                        <div className="summary-grid">
                            <div className="info-section">
                                <h3>Importer Information</h3>
                                <div className="info-row">
                                    <span className="label">Company Name:</span>
                                    <span className="value">{boe.importer}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">IEC Number:</span>
                                    <span className="value">{boe.iec_no}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">GST Number:</span>
                                    <span className="value">{boe.gst_no}</span>
                                </div>
                            </div>

                            <div className="info-section">
                                <h3>Shipment Details</h3>
                                <div className="info-row">
                                    <span className="label">Port of Entry:</span>
                                    <span className="value">{boe.port_name} ({boe.port_code})</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Country of Origin:</span>
                                    <span className="value">{boe.origin_country}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">BE Date:</span>
                                    <span className="value">{formatDate(boe.be_date)}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">MAWB Number:</span>
                                    <span className="value">{boe.mawb}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">IGM Number:</span>
                                    <span className="value">{boe.igm_no}</span>
                                </div>
                            </div>

                            <div className="info-section">
                                <h3>Financial Summary</h3>
                                <div className="info-row">
                                    <span className="label">Assessable Value:</span>
                                    <span className="value amount">{formatCurrency(boe.assessable_value)}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Total Duty:</span>
                                    <span className="value amount">{formatCurrency(boe.total_duty)}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Payment Status:</span>
                                    <span className={`value status-pill ${boe.payment_status === 'Paid' ? 'paid' : 'pending'}`}>
                                        {boe.payment_status}
                                    </span>
                                </div>
                                {boe.payment_status === 'Paid' && (
                                    <div className="info-row">
                                        <span className="label">Challan Number:</span>
                                        <span className="value">{boe.challan_no}</span>
                                    </div>
                                )}
                            </div>

                            <div className="info-section">
                                <h3>Processing Information</h3>
                                <div className="info-row">
                                    <span className="label">Total Items:</span>
                                    <span className="value">{boe.items_count}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Total Invoices:</span>
                                    <span className="value">{boe.invoice_count}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Clearance Time:</span>
                                    <span className="value">{boe.clearance_time ? `${boe.clearance_time} hours` : 'N/A'}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Last Updated:</span>
                                    <span className="value">{formatDate(boe.last_updated)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'invoices' && (
                        <div className="invoices-section">
                            <table className="detail-table">
                                <thead>
                                    <tr>
                                        <th>Invoice No</th>
                                        <th>Date</th>
                                        <th>Supplier</th>
                                        <th>Country</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((invoice, index) => (
                                        <tr key={index}>
                                            <td className="mono">{invoice.invoice_no}</td>
                                            <td>{formatDate(invoice.invoice_date)}</td>
                                            <td>{invoice.supplier}</td>
                                            <td>{invoice.country}</td>
                                            <td className="amount">{formatCurrency(invoice.value)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'items' && (
                        <div className="items-section">
                            <table className="detail-table">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>HS Code</th>
                                        <th>Description</th>
                                        <th>Qty</th>
                                        <th>Unit</th>
                                        <th>Unit Price</th>
                                        <th>Assessable Value</th>
                                        <th>BCD %</th>
                                        <th>IGST %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lineItems.map((item) => (
                                        <tr key={item.sr_no}>
                                            <td>{item.sr_no}</td>
                                            <td className="mono">{item.hs_code}</td>
                                            <td className="description">{item.description}</td>
                                            <td className="number">{item.quantity}</td>
                                            <td>{item.unit}</td>
                                            <td className="amount">₹{item.unit_price.toLocaleString('en-IN')}</td>
                                            <td className="amount">{formatCurrency(item.assessable_value)}</td>
                                            <td className="number">{item.duty_rate}%</td>
                                            <td className="number">{item.igst_rate}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'duties' && (
                        <div className="duties-section">
                            <table className="detail-table">
                                <thead>
                                    <tr>
                                        <th>Duty Type</th>
                                        <th>Rate</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dutyDetails.map((duty, index) => (
                                        <tr key={index}>
                                            <td>{duty.type}</td>
                                            <td>{duty.rate}</td>
                                            <td className="amount">{formatCurrency(duty.amount)}</td>
                                        </tr>
                                    ))}
                                    <tr className="total-row">
                                        <td colSpan="2"><strong>Total Duty</strong></td>
                                        <td className="amount"><strong>{formatCurrency(boe.total_duty)}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'timeline' && (
                        <div className="timeline-section">
                            {timeline.map((event, index) => (
                                <div key={index} className={`timeline-item ${event.status}`}>
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-header">
                                            <span className="timeline-event">{event.event}</span>
                                            <span className="timeline-time">{formatDate(event.date)} {event.time}</span>
                                        </div>
                                        <div className="timeline-user">by {event.user}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BOEDetail;
