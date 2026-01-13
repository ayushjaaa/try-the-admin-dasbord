import React, { useEffect, useRef, useState } from 'react';
import { BrainRenderer } from '../../utils/brainVisualization';
import './BrainMapping.css';

const BrainMapping = () => {
    const mainCanvasRef = useRef(null);
    const thumb1Ref = useRef(null);
    const thumb2Ref = useRef(null);
    const thumb3Ref = useRef(null);
    const [activeThumb, setActiveThumb] = useState(0);

    useEffect(() => {
        // Delay to create staggered animation effect
        setTimeout(() => {
            // Draw main brain
            if (mainCanvasRef.current) {
                const canvas = mainCanvasRef.current;
                canvas.width = 600;
                canvas.height = 400;
                const renderer = new BrainRenderer(canvas, 'main', 1.0);
                renderer.render();
            }

            // Draw thumbnails
            const thumbRefs = [thumb1Ref, thumb2Ref, thumb3Ref];
            thumbRefs.forEach((ref, index) => {
                if (ref.current) {
                    const canvas = ref.current;
                    canvas.width = 120;
                    canvas.height = 120;
                    const renderer = new BrainRenderer(canvas, 'thumb', 0.6);
                    renderer.render();
                }
            });
        }, 300);
    }, []);

    return (
        <>
            {/* Card 1: Brain Thumbnails */}
            <div className="brain-mapping-card brain-thumbnails-card">
                <h2 className="card-title">Brain Mapping</h2>
                <div className="brain-thumbnails">
                    {[thumb1Ref, thumb2Ref, thumb3Ref].map((ref, index) => (
                        <div
                            key={index}
                            className={`thumbnail ${activeThumb === index ? 'active' : ''}`}
                            onClick={() => setActiveThumb(index)}
                        >
                            <canvas ref={ref} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Card 2: Main Brain Visualization */}
            <div className="brain-mapping-card brain-main-card">
                <div className="brain-content">
                    <div className="brain-main">
                        <canvas ref={mainCanvasRef} />
                    </div>

                    <div className="intensity-scale">
                        <div className="scale-value">0.50</div>
                        <div className="scale-gradient"></div>
                        <div className="scale-value">0.25</div>
                        <div className="scale-gradient"></div>
                        <div className="scale-value">0.01</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BrainMapping;
