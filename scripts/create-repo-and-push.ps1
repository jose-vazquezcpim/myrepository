<#
Usage: Run from the project root in PowerShell. Requires Git and GitHub CLI (`gh`) installed and authenticated.
This script will create a new GitHub repo, push current files, and optionally open the repo page.
#>
param(
  [Parameter(Mandatory=$true)] [string]$RepoName,
  [string]$Description = "Prompt library static site",
  [switch]$Private
)

if(-not (Get-Command gh -ErrorAction SilentlyContinue)){
  Write-Host "GitHub CLI (gh) not found. Install from https://cli.github.com/ and authenticate (gh auth login)." -ForegroundColor Yellow; exit 1
}

# PowerShell 5.1 doesn't support the C-style ternary operator; use if/else instead
if ($Private) { $privateFlag = "--private" } else { $privateFlag = "--public" }

try{
  gh repo create $RepoName --description "$Description" $privateFlag --confirm 2>&1 | Write-Host
} catch {
  Write-Host "Failed to create GitHub repository: $_" -ForegroundColor Red
  exit 1
}

git init
git add .
try{ git commit -m "Initial commit: prompt library static site" } catch { Write-Host "No changes to commit or git not configured." -ForegroundColor Yellow }
git branch -M main

# Try to resolve the GitHub username via gh; fall back to asking the user
try{
  $login = gh api user --jq .login
} catch {
  Write-Host "Unable to determine GitHub username via 'gh api'. Please provide the repo remote URL manually." -ForegroundColor Yellow
  exit 1
}

git remote add origin "https://github.com/$login/$RepoName.git"
try{
  git push -u origin main
} catch {
  Write-Host "git push failed: $_" -ForegroundColor Red
  exit 1
}

Write-Host "Repo created and pushed: https://github.com/$login/$RepoName" -ForegroundColor Green
