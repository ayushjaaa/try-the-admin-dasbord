import React from 'react';
import BOEOverview from '../components/BOEOverview/BOEOverview';
import BOEDashboard from '../components/BOEDashboard/BOEDashboard';
import DatabaseSchema from '../components/DatabaseSchema/DatabaseSchema';

const DashboardPage = () => {
    return (
        <>
            {/* BOE Overview - New Enterprise Design */}
            <section className="overview-section">
                <BOEOverview />
            </section>

            {/* Original BOE Dashboard with Filters */}
            <section className="boe-section">
                <BOEDashboard />
            </section>

            {/* Database Schema Section */}
            <section className="database-section">
                <DatabaseSchema />
            </section>
        </>
    );
};

export default DashboardPage;
