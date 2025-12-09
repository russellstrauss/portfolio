# Script to verify if an image file is a real image or an LFS pointer

param(
    [Parameter(Mandatory=$true)]
    [string]$ImagePath
)

if (-not (Test-Path $ImagePath)) {
    Write-Host "File not found: $ImagePath" -ForegroundColor Red
    exit 1
}

$content = Get-Content $ImagePath -TotalCount 1 -ErrorAction SilentlyContinue
$fileInfo = Get-Item $ImagePath

Write-Host "Checking: $ImagePath" -ForegroundColor Cyan
Write-Host "File size: $($fileInfo.Length) bytes" -ForegroundColor Yellow

if ($content -eq "version https://git-lfs.github.com/spec/v1") {
    Write-Host "STATUS: LFS POINTER FILE (corrupted)" -ForegroundColor Red
    Write-Host "This is NOT a real image file!" -ForegroundColor Red
    Write-Host ""
    Write-Host "The file contains:" -ForegroundColor Yellow
    Get-Content $ImagePath -TotalCount 3
    Write-Host ""
    Write-Host "This needs to be replaced with the actual image file." -ForegroundColor Yellow
} else {
    # Check if it's a valid image by reading first bytes
    $bytes = Get-Content $ImagePath -Encoding Byte -TotalCount 4 -ErrorAction SilentlyContinue
    if ($bytes) {
        $header = ($bytes | ForEach-Object { "{0:X2}" -f $_ }) -join " "
        Write-Host "STATUS: REAL IMAGE FILE" -ForegroundColor Green
        Write-Host "File header (hex): $header" -ForegroundColor Green
        
        # Check for common image file signatures
        if ($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8) {
            Write-Host "File type: JPEG" -ForegroundColor Green
        } elseif ($bytes[0] -eq 0x89 -and $bytes[1] -eq 0x50 -and $bytes[2] -eq 0x4E -and $bytes[3] -eq 0x47) {
            Write-Host "File type: PNG" -ForegroundColor Green
        } elseif ($bytes[0] -eq 0x47 -and $bytes[1] -eq 0x49 -and $bytes[2] -eq 0x46) {
            Write-Host "File type: GIF" -ForegroundColor Green
        } else {
            Write-Host "File type: Unknown (but appears to be binary/image data)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "STATUS: Could not read file" -ForegroundColor Yellow
    }
}

