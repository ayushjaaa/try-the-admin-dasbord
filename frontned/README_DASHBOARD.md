# BioSync - Medical Analytics Dashboard

A production-grade, medical analytics dashboard built with React, featuring brain health monitoring and AI-powered insights.

## Features

- **Professional Medical-Grade UI**: Calm, premium, and clinically trustworthy design
- **Brain Mapping Visualization**: Interactive heatmap with multiple view angles
- **AI Analytics Insights**: Real-time risk assessment with animated gauge
- **Comprehensive Metrics Grid**: Neural activity, brain symmetry, and volume measurements
- **Suggested Next Steps**: Actionable health recommendations organized by category
- **Fully Responsive**: Adapts seamlessly from desktop to mobile
- **Smooth Animations**: Subtle, professional transitions throughout

## Tech Stack

- **React** (Vite)
- **HTML5 Canvas** for brain visualizations
- **CSS3** with design tokens for consistent styling
- **Vanilla JavaScript** for animations

## Project Structure

```
frontned/
├── src/
│   ├── components/
│   │   ├── Dashboard/          # Main dashboard container
│   │   ├── TopNavigation/      # Navigation bar with brand and links
│   │   ├── BrainMapping/       # Brain heatmap visualization
│   │   ├── AIInsights/         # Risk cards and animated gauge
│   │   ├── MetricsGrid/        # Health metrics with charts
│   │   └── SuggestedNextSteps/ # Actionable recommendations
│   ├── styles/
│   │   └── tokens.css          # Design system tokens
│   ├── utils/
│   │   └── brainVisualization.js  # Canvas rendering logic
│   ├── App.jsx                 # Root component
│   └── index.css               # Global styles
```

## Installation & Running

1. Make sure Node.js is installed:
   ```bash
   node --version
   npm --version
   ```

2. Install dependencies (if not already installed):
   ```bash
   cd frontned
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown (typically http://localhost:5173)

## Design System

### Color Palette
- **Background**: `#e5e5e5` - Light grey for calm appearance
- **Surface**: `#ffffff` - White cards with soft shadows
- **Surface Dark**: `#0a0a0a` - For heavy data visualizations
- **Text Primary**: `#0a0a0a` - High contrast for readability
- **Text Secondary**: `#666666` - Supporting text

### Status Colors
- **Normal**: `#10b981` (Green)
- **Moderate**: `#f59e0b` (Amber)
- **Elevated**: `#ef4444` (Red)

### Typography
- **Font Family**: SF Pro Display / System UI fallbacks
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)
- **Generous line height** for clinical readability

### Spacing
- Uses 8px base unit (4px, 8px, 16px, 24px, 32px, 48px)
- Consistent padding and gaps throughout

### Border Radius
- Small: 6px
- Medium: 12px
- Large: 16px
- XLarge: 20px
- Full: 9999px (pill shape)

## Component Details

### TopNavigation
- Sticky header with blur backdrop
- Pill-style navigation links
- Active state highlighting
- Notification badge
- User avatar

### BrainMapping
- Three thumbnail views (clickable)
- Main brain canvas with heatmap
- Color intensity scale
- Real-time rendering with Canvas API

### AIInsights
- Date range filter
- Two risk assessment cards with progress bars
- Animated semi-circular gauge (0-50 scale)
- Gradient color coding (red → amber → yellow)

### MetricsGrid
- **Neural Activity Index**: Line chart with gradient fill
- **Brain Symmetry Index**: Dual hemisphere bar chart
- **Hippocampal Volume**: Comparison bars with averages
- **Gray Matter Volume**: Similar comparison visualization

### SuggestedNextSteps
- Four categorized sections:
  - Diagnostic (yellow)
  - Specialist (blue)
  - Lifestyle (pink)
  - Monitoring (indigo)
- Timeline indicators
- Bulleted action items

## Animation Philosophy

- **No flashy or jumpy animations**
- Smooth cubic-bezier easing (0.4, 0, 0.2, 1)
- Fast transitions: 150ms
- Base transitions: 250ms
- Slow transitions: 350ms
- Hover states: subtle elevation and transform
- Canvas animations: requestAnimationFrame for 60fps

## Responsive Breakpoints

- **Desktop**: 1600px max-width container
- **Tablet**: < 1400px (adjusted grid columns)
- **Mobile**: < 768px (single column layout)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Canvas rendering optimized with proper cleanup
- CSS transitions over JavaScript animations
- Lazy rendering with useEffect hooks
- No unnecessary re-renders
- Efficient SVG gradients for gauge

## Customization

### Design Tokens
Edit `/src/styles/tokens.css` to customize:
- Colors
- Spacing
- Typography
- Border radius
- Shadows
- Transitions

### Brain Visualization
Modify `/src/utils/brainVisualization.js` to adjust:
- Heatmap intensity
- Color gradients
- Region density
- Hotspot locations

## Production Build

```bash
npm run build
```

Output will be in the `dist/` folder, ready for deployment.

## Future Enhancements

- Real data integration via API
- User authentication
- Detailed historical trends
- Export reports as PDF
- Dark mode toggle
- Accessibility improvements (ARIA labels)

## License

This is a demo project for educational purposes.

---

Built with attention to detail for a professional medical SaaS experience.
