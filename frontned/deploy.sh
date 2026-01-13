#!/bin/bash

echo "🚀 BOE Dashboard - Vercel Deployment"
echo "===================================="
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the frontned directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check for errors
if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Test build
echo "🔨 Testing build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    echo "Fix the errors above before deploying"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found"
    echo "Install it with: npm install -g vercel"
    echo ""
    echo "Or deploy manually:"
    echo "1. Push to GitHub"
    echo "2. Import on vercel.com"
    exit 0
fi

# Deploy
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Test these URLs:"
echo "  - / (Dashboard)"
echo "  - /tracker (BOE Tracker)"
echo "  - /analytics (Charts)"
echo "  - /finance (Coming Soon)"
