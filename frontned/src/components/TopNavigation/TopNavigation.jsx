import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TopNavigation.css';

const TopNavigation = () => {
    const location = useLocation();

    return (
        <nav className="top-nav">
            <div className="nav-container">
                <div className="nav-brand">
                    <div className="brand-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10z" fill="currentColor"/>
                        </svg>
                    </div>
                    <span className="brand-name">BOE Portal</span>
                </div>

                <div className="nav-links">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/tracker" className={`nav-link ${location.pathname === '/tracker' ? 'active' : ''}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>BOE Tracker</span>
                    </Link>
                    <Link to="/analytics" className={`nav-link ${location.pathname === '/analytics' ? 'active' : ''}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                            <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                            <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                            <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>Analytics</span>
                    </Link>
                    <Link to="/finance" className={`nav-link ${location.pathname === '/finance' ? 'active' : ''}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" fill="currentColor"/>
                        </svg>
                        <span>Finance</span>
                    </Link>
                </div>

                <div className="nav-actions">
                    <button className="icon-btn notification-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="notification-dot"></span>
                    </button>
                    <div className="user-avatar">
                        <img src="https://i.pravatar.cc/150?img=47" alt="User" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNavigation;
