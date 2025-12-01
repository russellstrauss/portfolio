#!/bin/bash
# Bash script to deploy dist/ folder to GitHub Pages gh-pages branch
# Alternative for Unix-based systems

echo "Building for GitHub Pages..."
npm run build:github

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo "Deploying to gh-pages branch..."

# Create or checkout gh-pages branch
git checkout --orphan gh-pages 2>/dev/null || git checkout gh-pages

# Remove all files from the branch
git rm -rf . 2>/dev/null || true

# Copy dist contents to root
cp -r dist/* .

# Stage all files
git add -A

# Commit
git commit -m "Deploy to GitHub Pages [skip ci]"

# Push to origin
echo "Pushing to origin/gh-pages..."
git push origin gh-pages --force

# Switch back to master/main
git checkout master 2>/dev/null || git checkout main

echo "Deployment complete!"
echo "Your site will be available at: https://russellstrauss.github.io/portfolio-2020/"

