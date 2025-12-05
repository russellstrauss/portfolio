# PowerShell script to deploy dist/ folder to GitHub Pages gh-pages branch
# This works around Windows path length limitations with gh-pages

Write-Host "Building for GitHub Pages..." -ForegroundColor Cyan
npm run build:github

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# Verify dist folder exists
if (-not (Test-Path "dist")) {
    Write-Host "dist folder not found! Build may have failed." -ForegroundColor Red
    exit 1
}

Write-Host "Deploying to gh-pages branch..." -ForegroundColor Cyan

# Save current branch (compatible with older git versions)
$currentBranch = git rev-parse --abbrev-ref HEAD

# Add any new files that should be tracked (like the SVG icons we created)
Write-Host "Staging new files..." -ForegroundColor Yellow
git add public/img/icon-checkmark.svg public/img/icon-close-black.svg 2>$null | Out-Null

# Remove untracked files that might conflict (like debug.log)
Write-Host "Cleaning untracked files..." -ForegroundColor Yellow
if (Test-Path "debug.log") {
    Remove-Item "debug.log" -Force -ErrorAction SilentlyContinue
}

# Stash any uncommitted changes (including the newly added files)
Write-Host "Stashing uncommitted changes..." -ForegroundColor Yellow
git stash push -m "Stash before GitHub Pages deployment" --include-untracked 2>$null | Out-Null

# Create or checkout gh-pages branch
Write-Host "Checking out gh-pages branch..." -ForegroundColor Yellow
git checkout --orphan gh-pages 2>$null
if ($LASTEXITCODE -ne 0) {
    # If orphan branch creation failed, try regular checkout
    # First, clean any untracked files that might conflict
    Write-Host "Cleaning untracked files before checkout..." -ForegroundColor Yellow
    git clean -fd 2>$null | Out-Null
    
    # Remove specific files that might conflict
    if (Test-Path "public/img/icon-checkmark.svg") {
        Remove-Item "public/img/icon-checkmark.svg" -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path "public/img/icon-close-black.svg") {
        Remove-Item "public/img/icon-close-black.svg" -Force -ErrorAction SilentlyContinue
    }
    
    # Force checkout to overwrite any conflicts
    git checkout -f gh-pages 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to checkout gh-pages branch!" -ForegroundColor Red
        git checkout $currentBranch 2>$null | Out-Null
        git stash pop 2>$null | Out-Null
        exit 1
    }
    # Remove all existing files
    git rm -rf . 2>$null | Out-Null
}

# Remove all existing files except .git
Write-Host "Cleaning existing files..." -ForegroundColor Yellow
Get-ChildItem -Path . -Exclude .git,dist,node_modules | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# Copy dist contents to root
Write-Host "Copying dist files..." -ForegroundColor Yellow
Copy-Item -Path "dist\*" -Destination "." -Recurse -Force

# Ensure 404.html exists (Vite should copy it from public, but verify)
if (-not (Test-Path "404.html")) {
    if (Test-Path "public/404.html") {
        Write-Host "Copying 404.html from public..." -ForegroundColor Yellow
        Copy-Item -Path "public/404.html" -Destination "404.html" -Force
    }
}

# Stage all files (only what we just copied from dist)
Write-Host "Staging files..." -ForegroundColor Yellow
git add -A

# Commit
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Deploy to GitHub Pages [skip ci]"

if ($LASTEXITCODE -ne 0) {
    Write-Host "No changes to commit (or commit failed)" -ForegroundColor Yellow
}

# Push to origin
Write-Host "Pushing to origin/gh-pages..." -ForegroundColor Yellow
git push origin gh-pages --force

if ($LASTEXITCODE -ne 0) {
    Write-Host "Push failed!" -ForegroundColor Red
    git checkout $currentBranch
    exit 1
}

# Switch back to original branch
Write-Host "Switching back to $currentBranch..." -ForegroundColor Yellow
git checkout $currentBranch 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    git checkout main 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        git checkout master
    }
}

# Restore stashed changes (drop if there are conflicts to avoid re-applying conflicted files)
Write-Host "Restoring stashed changes..." -ForegroundColor Yellow
git stash pop 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Stash pop had conflicts or failed. Dropping stash to avoid re-applying conflicts..." -ForegroundColor Yellow
    git stash drop 2>$null | Out-Null
}

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Your site will be available at: https://russellstrauss.github.io/portfolio/" -ForegroundColor Green

