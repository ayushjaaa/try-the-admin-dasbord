import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavigation from '../TopNavigation/TopNavigation';
import DashboardPage from '../../pages/DashboardPage';
import BOETrackerPage from '../../pages/BOETrackerPage';
import AnalyticsPage from '../../pages/AnalyticsPage';
// import AnalyticsPageSimple from '../../pages/AnalyticsPageSimple';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <Router>
            <div className="dashboard-app">
                <TopNavigation />

                <main className="main-content">
                    <div className="dashboard-container">
                        <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/tracker" element={<BOETrackerPage />} />
                            <Route path="/analytics" element={<AnalyticsPage />} />
                            <Route path="/finance" element={<div className="coming-soon"><h2>Finance & Reconciliation</h2><p>Coming soon...</p></div>} />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    );
};

export default Dashboard;
