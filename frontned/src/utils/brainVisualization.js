export class BrainRenderer {
    constructor(canvas, view = 'main', scale = 1.0) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.view = view;
        this.scale = scale;
    }

    render() {
        const { width, height } = this.canvas;
        const centerX = width / 2;
        const centerY = height / 2;

        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);

        // Draw brain
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.drawBrainShape(width, height);
        this.ctx.restore();

        // Add heatmap regions
        this.addHeatmapRegions(centerX, centerY, width, height);
    }

    drawBrainShape(width, height) {
        const w = width * (this.view === 'main' ? 0.8 : 0.7);
        const h = height * (this.view === 'main' ? 0.6 : 0.7);

        this.ctx.beginPath();

        // Left hemisphere
        this.ctx.moveTo(-w/2, 0);
        this.ctx.bezierCurveTo(-w/2, -h/2.5, -w/4, -h/2.2, 0, -h/3);

        // Right hemisphere
        this.ctx.bezierCurveTo(w/4, -h/2.2, w/2, -h/2.5, w/2, 0);

        // Bottom right
        this.ctx.bezierCurveTo(w/2, h/2.5, w/4, h/2.2, 0, h/3);

        // Bottom left
        this.ctx.bezierCurveTo(-w/4, h/2.2, -w/2, h/2.5, -w/2, 0);

        this.ctx.closePath();

        // Fill with dark base
        this.ctx.fillStyle = 'rgba(20, 20, 30, 0.6)';
        this.ctx.fill();

        // Stroke outline
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    addHeatmapRegions(centerX, centerY, width, height) {
        const regions = this.view === 'main' ? 80 : 40;

        for (let i = 0; i < regions; i++) {
            const angle = (Math.PI * 2 * i) / regions + Math.random() * 0.3;
            const radius = (Math.random() * 0.3 + 0.2) * Math.min(width, height) / 2;

            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            const size = (Math.random() * 30 + 20) * this.scale;
            const intensity = Math.random();
            const color = this.getHeatmapColor(intensity);

            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, color.replace(')', ', 0.8)').replace('rgb', 'rgba'));
            gradient.addColorStop(1, color.replace(')', ', 0)').replace('rgb', 'rgba'));

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        if (this.view === 'main') {
            this.addHotspots(centerX, centerY, width, height);
        }
    }

    addHotspots(centerX, centerY, width, height) {
        const hotspots = [
            { x: centerX - width * 0.15, y: centerY - height * 0.1, intensity: 0.9 },
            { x: centerX + width * 0.18, y: centerY + height * 0.05, intensity: 0.85 },
            { x: centerX - width * 0.08, y: centerY + height * 0.12, intensity: 0.75 },
            { x: centerX + width * 0.1, y: centerY - height * 0.15, intensity: 0.8 }
        ];

        hotspots.forEach(spot => {
            const gradient = this.ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, 60);
            const color = this.getHeatmapColor(spot.intensity);

            gradient.addColorStop(0, color.replace(')', ', 0.9)').replace('rgb', 'rgba'));
            gradient.addColorStop(0.5, color.replace(')', ', 0.5)').replace('rgb', 'rgba'));
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(spot.x, spot.y, 60, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    getHeatmapColor(intensity) {
        if (intensity > 0.7) {
            return `rgb(${Math.floor(239 + (255 - 239) * (intensity - 0.7) / 0.3)}, ${Math.floor(68 + (150 - 68) * (intensity - 0.7) / 0.3)}, 68)`;
        } else if (intensity > 0.4) {
            return `rgb(${Math.floor(245 + (239 - 245) * (intensity - 0.4) / 0.3)}, ${Math.floor(158 + (68 - 158) * (intensity - 0.4) / 0.3)}, ${Math.floor(11 + (68 - 11) * (intensity - 0.4) / 0.3)})`;
        } else {
            return `rgb(${Math.floor(234 - (234 - 16) * intensity / 0.4)}, ${Math.floor(179 + (185 - 179) * intensity / 0.4)}, ${Math.floor(8 + (129 - 8) * intensity / 0.4)})`;
        }
    }
}
