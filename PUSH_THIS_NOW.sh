#!/bin/bash

echo "🚀 Pushing critical Vercel fix..."
echo ""

cd "/Users/ayushjaiswal/try promts"

# Push to GitHub
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Pushed successfully!"
    echo ""
    echo "Now:"
    echo "1. Wait 2-3 minutes for Vercel to rebuild"
    echo "2. Check https://vercel.com/dashboard"
    echo "3. Test your site - 404 should be GONE!"
else
    echo ""
    echo "⚠️  Push failed - you need to authenticate"
    echo ""
    echo "Run this command manually:"
    echo "  cd '/Users/ayushjaiswal/try promts'"
    echo "  git push origin main"
fi
