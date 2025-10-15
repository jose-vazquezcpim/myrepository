# Prompt Library — Static Replica

This is a small static replica of the site at https://ambitious-dune-0ee219d0f.1.azurestaticapps.net/

Files:
- `index.html` — main page
- `styles.css` — minimal styling
- `script.js` — copy-to-clipboard behavior and toast
- `package.json` — dev start script

Running locally (Windows PowerShell):

```powershell
# install serve once globally or use npx
iwr -useb https://get.scoop.sh | iex; # optional install scoop
# run with npx (no global install required)
npx serve . -l 3000
# open in browser
Start-Process "http://localhost:3000"
```

Deploying to Azure Static Web Apps:
Deploying to Azure Static Web Apps (recommended flow)

1. Create or use an existing GitHub repository and push this project to it. Set the default branch to `main` (or change the workflow to match your branch).

2. In the Azure portal, create a Static Web App and during creation choose GitHub as the source and authorize Azure to access your repo. Point the build configuration to:
	- App location: /
	- Api location: (leave blank)
	- Artifact location: /

	Azure will create a GitHub Actions secret named `AZURE_STATIC_WEB_APPS_API_TOKEN` automatically for your repository. If you create the Static Web App via other means, create a repository secret with that name and paste the deployment token from the Azure portal.

3. The repository already contains a workflow at `.github/workflows/azure-static-web-apps.yml` that will deploy the site to Azure when you push to `main`.

4. To trigger a deploy, push your code to GitHub:

```powershell
git init
git add .
git commit -m "Add static site"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

5. After the workflow succeeds, your site will be available at the Azure Static Web App URL (for example: `https://calm-ocean-05c867b1e.3.azurestaticapps.net`).

Helper scripts

Two convenience PowerShell scripts are included in `scripts/`:

- `scripts/create-repo-and-push.ps1` — creates a GitHub repo using the GitHub CLI (`gh`), commits the current files, and pushes to the new repo. Usage:

```powershell
.\scripts\create-repo-and-push.ps1 -RepoName "prompt-library" -Description "Prompt library static site" -Private
```

- `scripts/start-local.ps1` — starts a local static server on the specified port (default 3000) and opens the browser:

```powershell
.\scripts\start-local.ps1 -Port 3000
```

Responsive behavior

- On wide screens the categories show dropdown-like submenus. On small screens (<= 720px) submenus become stacked accordion lists under each category for usability.

Troubleshooting CI/CD

- If the Actions workflow fails, visit the Actions tab for the `build_and_deploy` job and inspect the logs. Common fixes:
	- Ensure the repo has the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret if you created the Static Web App outside the GitHub-Azure connection flow.
	- Confirm `app_location` and `app_artifact_location` are `/` in the workflow (this project is fully static in root).

Manual deploy (if you want to upload files directly)

- You can also upload the built static files to the Azure Static Web App using the Azure Portal's "Upload" feature or use the Azure CLI to deploy, but the GitHub Actions flow is the recommended automated approach.

Notes on fidelity: this is a visual and interaction replica — it doesn't include backend features or analytics from the original.
