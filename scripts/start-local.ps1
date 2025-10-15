<#
Start the local static server and open the browser. Requires Node.js (npx) available.
Run from project root.
#>
param(
  [int]$Port = 3000
)

# Check that npx (Node.js) is available
if(-not (Get-Command npx -ErrorAction SilentlyContinue)){
  Write-Host "npx not found. Please install Node.js and ensure 'npx' is on your PATH." -ForegroundColor Red
  exit 1
}

# Start the static server in a new process. Try to start 'npx' directly; if it fails (non-exe shim), fall back to using cmd.exe /c
$args = "serve . -l $Port"
try{
  Start-Process -FilePath "npx" -ArgumentList $args -NoNewWindow -ErrorAction Stop | Out-Null
} catch {
  # Some npx installations are node shims that aren't directly executable by Start-Process on Windows; use cmd.exe as a reliable fallback
  $cmdArgs = "/c npx serve . -l $Port"
  Start-Process -FilePath "cmd.exe" -ArgumentList $cmdArgs -WindowStyle Hidden
}

# Give the server a moment to start and then open the browser
Start-Sleep -Milliseconds 700
Start-Process "http://localhost:$Port"
