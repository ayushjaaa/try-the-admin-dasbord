import React, { useEffect, useRef, useState } from 'react';
import { useCountUp } from '../../utils/useCountUp';
import './MetricsGrid.css';

const MetricsGrid = () => {
    const neuralChartRef = useRef(null);
    const [chartDrawn, setChartDrawn] = useState(false);

    // Animated counters
    const neuralCount = useCountUp(82, 2000, 800);
    const symmetryCount = useCountUp(0.96, 2000, 1000, 2);
    const hippoCount = useCountUp(1.2, 2000, 1200, 1);
    const grayCount = useCountUp(715, 2000, 1400);

    useEffect(() => {
        // Draw neural activity chart with animation
        setTimeout(() => {
            if (neuralChartRef.current && !chartDrawn) {
                const canvas = neuralChartRef.current;
                const ctx = canvas.getContext('2d');
                const width = canvas.width = canvas.offsetWidth * 2;
                const height = canvas.height;

                ctx.clearRect(0, 0, width, height);

                // Generate data points
                const points = 27;
                const data = [];
                for (let i = 0; i < points; i++) {
                    data.push(60 + Math.random() * 30 + Math.sin(i * 0.5) * 10);
                }

                // Animate drawing
                let currentPoint = 0;
                const animateLine = () => {
                    if (currentPoint <= points) {
                        ctx.clearRect(0, 0, width, height);

                        // Draw line chart
                        ctx.beginPath();
                        ctx.strokeStyle = '#10b981';
                        ctx.lineWidth = 3;
                        ctx.lineJoin = 'round';

                        const stepX = width / (points - 1);

                        for (let i = 0; i <= Math.min(currentPoint, points - 1); i++) {
                            const x = i * stepX;
                            const y = height - (data[i] / 100 * height);

                            if (i === 0) {
                                ctx.moveTo(x, y);
                            } else {
                                ctx.lineTo(x, y);
                            }
                        }

                        ctx.stroke();

                        // Draw gradient fill
                        if (currentPoint === points) {
                            ctx.lineTo(width, height);
                            ctx.lineTo(0, height);
                            ctx.closePath();

                            const gradient = ctx.createLinearGradient(0, 0, 0, height);
                            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
                            gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
                            ctx.fillStyle = gradient;
                            ctx.fill();
                        }

                        currentPoint++;
                        if (currentPoint <= points) {
                            requestAnimationFrame(animateLine);
                        } else {
                            setChartDrawn(true);
                        }
                    }
                };

                animateLine();
            }
        }, 1000);
    }, [chartDrawn]);

    return (
        <div className="metrics-grid">
            {/* Neural Activity Index */}
            <div className="metric-card" style={{ animationDelay: '0.3s' }}>
                <div className="metric-header">
                    <h3 className="metric-title">Neural Activity Index</h3>
                    <span className="status-badge status-normal">Normal</span>
                </div>
                <div className="metric-value-container">
                    <div className="metric-value">{neuralCount}<span className="metric-unit">/100</span></div>
                </div>
                <div className="chart-container">
                    <canvas ref={neuralChartRef} height="80"></canvas>
                    <div className="chart-tooltip">
                        <div className="tooltip-value">81</div>
                        <div className="tooltip-label">Mar 24</div>
                    </div>
                </div>
            </div>

            {/* Brain Symmetry Index */}
            <div className="metric-card" style={{ animationDelay: '0.4s' }}>
                <div className="metric-header">
                    <h3 className="metric-title">Brain Symmetry Index</h3>
                    <span className="status-badge status-normal">Normal</span>
                </div>
                <div className="metric-value-container">
                    <div className="metric-value">{symmetryCount}</div>
                </div>
                <div className="symmetry-chart">
                    <div className="symmetry-bars">
                        <div className="hemisphere-group">
                            <div className="hemisphere-bars left"></div>
                            <div className="hemisphere-label">Left Hemisphere</div>
                        </div>
                        <div className="hemisphere-group">
                            <div className="hemisphere-bars right"></div>
                            <div className="hemisphere-label">Right Hemisphere</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hippocampal Volume */}
            <div className="metric-card" style={{ animationDelay: '0.5s' }}>
                <div className="metric-header">
                    <h3 className="metric-title">Hippocampal Volume</h3>
                    <span className="status-badge status-moderate">Moderate</span>
                </div>
                <div className="metric-value-container">
                    <div className="metric-value">{hippoCount} cm<sup>3</sup></div>
                </div>
                <div className="comparison-chart">
                    <div className="comparison-row">
                        <span className="comparison-label">Average</span>
                        <div className="comparison-bar">
                            <div className="comparison-fill average"></div>
                        </div>
                        <span className="comparison-value">1.15 cm<sup>3</sup></span>
                    </div>
                    <div className="comparison-row">
                        <span className="comparison-label">Your Result</span>
                        <div className="comparison-bar">
                            <div className="comparison-fill result"></div>
                        </div>
                        <span className="comparison-value">1.2 cm<sup>3</sup></span>
                    </div>
                </div>
            </div>

            {/* Gray Matter Volume */}
            <div className="metric-card" style={{ animationDelay: '0.6s' }}>
                <div className="metric-header">
                    <h3 className="metric-title">Gray Matter Volume</h3>
                    <span className="status-badge status-normal">Normal</span>
                </div>
                <div className="metric-value-container">
                    <div className="metric-value">{grayCount} cm<sup>3</sup></div>
                </div>
                <div className="comparison-chart">
                    <div className="comparison-row">
                        <span className="comparison-label">Average</span>
                        <div className="comparison-bar">
                            <div className="comparison-fill average-green"></div>
                        </div>
                        <span className="comparison-value">730 cm<sup>3</sup></span>
                    </div>
                    <div className="comparison-row">
                        <span className="comparison-label">Your Result</span>
                        <div className="comparison-bar">
                            <div className="comparison-fill result-green"></div>
                        </div>
                        <span className="comparison-value">715 cm<sup>3</sup></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetricsGrid;
