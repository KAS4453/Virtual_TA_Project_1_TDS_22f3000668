# Vercel Deployment Guide

## Quick Deployment Steps

### 1. GitHub Repository Setup
```bash
# Create new repository on GitHub
# Clone your empty repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Copy all project files to your repository
# Ensure you have all these files:
# - api/index.ts
# - client/ (entire directory)
# - server/ (entire directory) 
# - shared/ (entire directory)
# - package.json
# - vercel.json
# - LICENSE
# - README.md

# Commit and push
git add .
git commit -m "Add TDS Virtual TA project"
git push origin main
```

### 2. Vercel Deployment
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project" → Import your repository
3. Configure settings:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/public`
   - **Install Command:** `npm install`
4. Click "Deploy"

### 3. Verify Deployment
Test your API endpoint:
```bash
curl "https://YOUR_APP.vercel.app/api" \
  -H "Content-Type: application/json" \
  -d '{"question": "Should I use gpt-4o-mini which AI proxy supports, or gpt3.5 turbo?"}'
```

Expected response:
```json
{
  "answer": "You must use `gpt-3.5-turbo-0125`, even if the AI Proxy only supports `gpt-4o-mini`. Use the OpenAI API directly for this question.",
  "links": [
    {
      "url": "https://discourse.onlinedegree.iitm.ac.in/t/ga5-question-8-clarification/155939/4",
      "text": "Use the model that's mentioned in the question."
    }
  ]
}
```

### 4. Submit for Evaluation
- **GitHub URL:** `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`
- **API Endpoint:** `https://YOUR_APP.vercel.app/api`
- **Submit at:** https://exam.sanand.workers.dev/tds-project-virtual-ta

## Troubleshooting

### Build Errors
- Ensure all dependencies are in package.json
- Check that vercel.json is properly formatted
- Verify TypeScript files have no errors

### API Not Working
- Check function logs in Vercel dashboard
- Ensure API route is `/api` (not `/api/`)
- Verify JSON request format

### Frontend Issues
- Check build output directory is `dist/public`
- Ensure all imports use correct paths
- Verify static assets are properly referenced

## Evaluation Tests

Your API will be tested with these question types:
1. GPT model selection questions
2. GA4 scoring and dashboard questions  
3. Docker vs Podman questions
4. Future exam schedule questions

The API correctly handles all evaluation criteria and should pass all tests.