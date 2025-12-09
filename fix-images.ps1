# Script to identify and help fix corrupted image files
# Images are currently LFS pointer files and need to be replaced with actual images

Write-Host "Checking featured images..." -ForegroundColor Cyan
Write-Host ""

$pointerFiles = @()
$totalExpectedSize = 0

Get-ChildItem "public/img/featured-images" -File | ForEach-Object {
    $content = Get-Content $_.FullName -TotalCount 3 -ErrorAction SilentlyContinue
    if ($content -and $content[0] -eq "version https://git-lfs.github.com/spec/v1") {
        $sizeLine = $content | Select-String "size (\d+)"
        if ($sizeLine) {
            $expectedSize = [long]($sizeLine.Matches.Groups[1].Value)
            $totalExpectedSize += $expectedSize
            $pointerFiles += [PSCustomObject]@{
                File = $_.Name
                CurrentSize = $_.Length
                ExpectedSize = $expectedSize
                ExpectedSizeMB = [math]::Round($expectedSize/1MB, 2)
                Path = $_.FullName
            }
        }
    }
}

Write-Host "Found $($pointerFiles.Count) images that are still LFS pointer files" -ForegroundColor Yellow
Write-Host "Total size needed: $([math]::Round($totalExpectedSize/1MB, 2)) MB" -ForegroundColor Yellow
Write-Host ""

if ($pointerFiles.Count -gt 0) {
    Write-Host "These files need to be replaced with actual images:" -ForegroundColor Red
    $pointerFiles | Sort-Object ExpectedSizeMB -Descending | Format-Table File, ExpectedSizeMB, CurrentSize -AutoSize
    
    Write-Host ""
    Write-Host "SOLUTIONS:" -ForegroundColor Green
    Write-Host ""
    Write-Host "1. If your site is deployed (GitHub Pages, Netlify, etc.):" -ForegroundColor Cyan
    Write-Host "   - Visit the live site"
    Write-Host "   - Right-click each image and 'Save Image As'"
    Write-Host "   - Save to: public/img/featured-images/"
    Write-Host ""
    Write-Host "2. If LFS quota is restored:" -ForegroundColor Cyan
    Write-Host "   git lfs install"
    Write-Host "   `$env:GIT_LFS_SKIP_SMUDGE = ''"
    Write-Host "   git lfs pull --include='public/img/featured-images/*'"
    Write-Host ""
    Write-Host "3. Download from GitHub web interface:" -ForegroundColor Cyan
    Write-Host "   https://github.com/russellstrauss/portfolio/tree/master/public/img/featured-images"
    Write-Host "   Try downloading files - if they're actual images, use those"
    Write-Host ""
    Write-Host "4. Restore from backup or another machine/clone"
    Write-Host ""
    Write-Host "After replacing files, verify they're real images:" -ForegroundColor Yellow
    Write-Host "   Get-Content 'public/img/featured-images/3DJ.jpg' -TotalCount 1"
    Write-Host "   Should NOT show 'version https://git-lfs.github.com/spec/v1'"
    Write-Host "   Should show binary data or image file headers"
}

