#!/bin/bash

echo "🔧 Fixing Chart.js installation..."
echo ""

# Uninstall wrong packages
echo "📦 Uninstalling incorrect packages..."
npm uninstall react-chartjs chart.js

# Install correct package
echo "📦 Installing react-chartjs-2 (will auto-install correct chart.js)..."
npm install react-chartjs-2

echo ""
echo "✅ Done! Now restart your dev server:"
echo "   npm run dev"
echo ""
echo "Then refresh your browser and go to /analytics"
