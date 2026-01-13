import React from 'react';
import './SuggestedNextSteps.css';

const SuggestedNextSteps = () => {
    return (
        <div className="next-steps-card">
            <div className="next-steps-header">
                <h2 className="card-title">Suggested Next Steps</h2>
                <button className="create-plan-btn">Create Plan +</button>
            </div>

            <div className="steps-content">
                {/* Diagnostic */}
                <div className="step-group">
                    <div className="step-icon diagnostic-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="step-info">
                        <div className="step-header">
                            <h4 className="step-title">Diagnostic</h4>
                            <span className="step-timeline">May - June</span>
                        </div>
                        <ul className="step-list">
                            <li>Repeat MRI in 3–6 months</li>
                            <li>Cognitive test recommended</li>
                            <li>Confirm markers via blood test</li>
                        </ul>
                    </div>
                </div>

                {/* Specialist */}
                <div className="step-group">
                    <div className="step-icon specialist-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </div>
                    <div className="step-info">
                        <div className="step-header">
                            <h4 className="step-title">Specialist</h4>
                            <span className="step-timeline">July</span>
                        </div>
                        <ul className="step-list">
                            <li>Consult a neurologist (early risk detected)</li>
                            <li>Optional: sleep specialist review</li>
                            <li>Refer to mental health professional</li>
                        </ul>
                    </div>
                </div>

                {/* Lifestyle */}
                <div className="step-group">
                    <div className="step-icon lifestyle-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M4.5 16.5C3 14 3 11.5 3 9C3 5.5 5.5 3 9 3C10.5 3 11.5 3.5 13 5C14.5 3.5 15.5 3 17 3C20.5 3 23 5.5 23 9C23 11.5 23 14 21.5 16.5C20 19 16 21.5 13 23C10 21.5 6 19 4.5 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="step-info">
                        <div className="step-header">
                            <h4 className="step-title">Lifestyle</h4>
                            <span className="step-timeline">Permanent</span>
                        </div>
                        <ul className="step-list">
                            <li>Start brain-healthy diet</li>
                            <li>Try cognitive training apps</li>
                            <li>Increase aerobic activity</li>
                        </ul>
                    </div>
                </div>

                {/* Monitoring */}
                <div className="step-group">
                    <div className="step-icon monitoring-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <div className="step-info">
                        <div className="step-header">
                            <h4 className="step-title">Monitoring</h4>
                        </div>
                        <ul className="step-list">
                            <li>Set re-scan reminder</li>
                            <li>Enable weekly memory checks</li>
                            <li>Activate real-time trend tracking for key biomarkers</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuggestedNextSteps;
