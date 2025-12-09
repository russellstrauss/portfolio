# Script to download featured images from the deployed GitHub Pages site
# This will replace LFS pointer files with actual images

$baseUrl = "https://russellstrauss.github.io/portfolio"
$imageDir = "public/img/featured-images"
$failed = @()
$success = @()

Write-Host "Downloading featured images from deployed site..." -ForegroundColor Cyan
Write-Host "Source: $baseUrl" -ForegroundColor Yellow
Write-Host ""

# Get list of images that are currently pointer files
$pointerFiles = Get-ChildItem $imageDir -File | Where-Object {
    $content = Get-Content $_.FullName -TotalCount 1 -ErrorAction SilentlyContinue
    $content -eq "version https://git-lfs.github.com/spec/v1"
}

Write-Host "Found $($pointerFiles.Count) images to download" -ForegroundColor Yellow
Write-Host ""

foreach ($file in $pointerFiles) {
    $imageUrl = "$baseUrl/img/featured-images/$($file.Name)"
    $outputPath = $file.FullName
    $backupPath = "$outputPath.backup"
    
    Write-Host "Downloading: $($file.Name)..." -NoNewline
    
    try {
        # Create backup of pointer file
        Copy-Item $outputPath $backupPath -Force
        
        # Download the image
        $response = Invoke-WebRequest -Uri $imageUrl -UseBasicParsing -ErrorAction Stop
        
        # Check if it's actually an image (not HTML error page)
        $contentType = $response.Headers['Content-Type']
        if ($contentType -like "image/*") {
            # Save the image
            [System.IO.File]::WriteAllBytes($outputPath, $response.Content)
            
            # Verify it's not a pointer file
            $verify = Get-Content $outputPath -TotalCount 1 -ErrorAction SilentlyContinue
            if ($verify -ne "version https://git-lfs.github.com/spec/v1") {
                Write-Host " SUCCESS" -ForegroundColor Green
                Remove-Item $backupPath -ErrorAction SilentlyContinue
                $success += $file.Name
            } else {
                Write-Host " FAILED (still pointer file)" -ForegroundColor Red
                Copy-Item $backupPath $outputPath -Force
                Remove-Item $backupPath -ErrorAction SilentlyContinue
                $failed += $file.Name
            }
        } else {
            Write-Host " FAILED (not an image: $contentType)" -ForegroundColor Red
            Copy-Item $backupPath $outputPath -Force
            Remove-Item $backupPath -ErrorAction SilentlyContinue
            $failed += $file.Name
        }
    } catch {
        Write-Host " FAILED ($($_.Exception.Message))" -ForegroundColor Red
        if (Test-Path $backupPath) {
            Copy-Item $backupPath $outputPath -Force
            Remove-Item $backupPath -ErrorAction SilentlyContinue
        }
        $failed += $file.Name
    }
    
    # Small delay to avoid overwhelming the server
    Start-Sleep -Milliseconds 200
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Successfully downloaded: $($success.Count) images" -ForegroundColor Green
Write-Host "Failed: $($failed.Count) images" -ForegroundColor $(if ($failed.Count -gt 0) { "Red" } else { "Green" })

if ($failed.Count -gt 0) {
    Write-Host ""
    Write-Host "Failed images:" -ForegroundColor Yellow
    $failed | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
    Write-Host ""
    Write-Host "These may need to be downloaded manually from:" -ForegroundColor Yellow
    Write-Host "$baseUrl/img/featured-images/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Verify an image was restored:" -ForegroundColor Cyan
Write-Host "  .\verify-image.ps1 -ImagePath 'public/img/featured-images/3DJ.jpg'" -ForegroundColor Yellow

