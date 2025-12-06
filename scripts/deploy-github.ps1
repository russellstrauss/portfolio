# PowerShell script to deploy dist/ folder to GitHub Pages gh-pages branch
# This works around Windows path length limitations with gh-pages

Write-Host "Building for GitHub Pages..." -ForegroundColor Cyan
npm run build:github

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# Verify dist folder exists and get absolute path BEFORE switching branches
if (-not (Test-Path "dist")) {
    Write-Host "dist folder not found! Build may have failed." -ForegroundColor Red
    exit 1
}

# Get absolute path to dist folder - this persists across branch switches
$distPath = (Resolve-Path "dist").Path

Write-Host "Deploying to gh-pages branch..." -ForegroundColor Cyan

# Save current branch (compatible with older git versions)
$currentBranch = git rev-parse --abbrev-ref HEAD

# Create or checkout gh-pages branch
Write-Host "Checking out gh-pages branch..." -ForegroundColor Yellow
git checkout --orphan gh-pages 2>$null
if ($LASTEXITCODE -ne 0) {
    git checkout gh-pages
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to checkout gh-pages branch!" -ForegroundColor Red
        exit 1
    }
    # Remove all existing files
    git rm -rf . 2>$null | Out-Null
}

# Copy dist contents to root using absolute path (dist folder doesn't exist in gh-pages branch)
Write-Host "Copying dist files from $distPath..." -ForegroundColor Yellow
Copy-Item -Path "$distPath\*" -Destination "." -Recurse -Force

# Copy hidden files if any (like .nojekyll)
$hiddenFiles = Get-ChildItem -Path $distPath -Force -Hidden -ErrorAction SilentlyContinue
if ($hiddenFiles) {
    foreach ($file in $hiddenFiles) {
        Copy-Item -Path $file.FullName -Destination $file.Name -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Create .nojekyll file to bypass Jekyll processing on GitHub Pages
Write-Host "Creating .nojekyll file..." -ForegroundColor Yellow
New-Item -Path ".nojekyll" -ItemType File -Force | Out-Null

# Stage all files
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

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Your site will be available at: https://russellstrauss.github.io/portfolio/" -ForegroundColor Green

