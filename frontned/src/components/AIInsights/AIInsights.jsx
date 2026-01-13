import React, { useEffect, useRef } from 'react';
import { useCountUp } from '../../utils/useCountUp';
import './AIInsights.css';

const AIInsights = () => {
    const gaugeRef = useRef(null);
    const gaugeValue = useCountUp(22, 2000, 1200);

    useEffect(() => {
        // Animate gauge
        const gaugePath = gaugeRef.current;
        if (gaugePath) {
            const totalLength = 251.2;
            const targetValue = 22;
            const maxValue = 50;
            const targetOffset = totalLength * (1 - targetValue / maxValue);

            let currentOffset = totalLength;
            const animate = () => {
                if (currentOffset > targetOffset) {
                    currentOffset -= 2;
                    gaugePath.setAttribute('stroke-dashoffset', currentOffset);
                    requestAnimationFrame(animate);
                }
            };

            setTimeout(animate, 1200);
        }
    }, []);

    return (
        <div className="ai-insights-card">
            <div className="insights-header">
                <h2 className="card-title">AI Analytics Insights</h2>
                <div className="date-filter">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>26 Mar - 24 Apr, 2025</span>
                </div>
            </div>

            <div className="insight-cards">
                <div className="insight-card">
                    <h3 className="insight-title">Neurodegenerative Risk</h3>
                    <p className="insight-desc">No signs of cognitive decline or neurodegenerative disease.</p>
                    <div className="insight-value">12%</div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill progress-fill-1"
                        ></div>
                    </div>
                </div>

                <div className="insight-card">
                    <h3 className="insight-title">Chronic Disease Markers</h3>
                    <p className="insight-desc">Inflammation elevated—further monitoring advised.</p>
                    <div className="insight-value">30%</div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill progress-fill-2"
                        ></div>
                    </div>
                </div>
            </div>

            <div className="gauge-container">
                <svg className="gauge-svg" viewBox="0 0 200 120">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#eab308', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>

                    {/* Background arc */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#1f1f1f"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />

                    {/* Tick marks */}
                    <g id="gaugeTicks">
                        {Array.from({ length: 61 }).map((_, i) => {
                            const startAngle = 180;
                            const endAngle = 360;
                            const angleStep = (endAngle - startAngle) / 60;
                            const angle = (startAngle + angleStep * i) * (Math.PI / 180);
                            const x1 = 100 + Math.cos(angle) * 76;
                            const y1 = 100 + Math.sin(angle) * 76;
                            const x2 = 100 + Math.cos(angle) * 68;
                            const y2 = 100 + Math.sin(angle) * 68;

                            const progress = i / 60;
                            let color;
                            if (progress < 0.33) color = '#ef4444';
                            else if (progress < 0.66) color = '#f59e0b';
                            else color = '#eab308';

                            return (
                                <line
                                    key={i}
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke={color}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            );
                        })}
                    </g>

                    {/* Value arc */}
                    <path
                        ref={gaugeRef}
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray="251.2"
                        strokeDashoffset="251.2"
                    />
                </svg>
                <div className="gauge-value">{gaugeValue}</div>
            </div>
        </div>
    );
};

export default AIInsights;
