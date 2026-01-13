import { useState, useEffect } from 'react';

export const useCountUp = (end, duration = 2000, delay = 0, decimals = 0) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const startTime = Date.now() + delay;
        let animationFrame;

        const animate = () => {
            const now = Date.now();

            if (now < startTime) {
                animationFrame = requestAnimationFrame(animate);
                return;
            }

            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = easeOutQuart * end;

            setCount(current);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [end, duration, delay, decimals]);

    return decimals > 0 ? count.toFixed(decimals) : Math.floor(count);
};
