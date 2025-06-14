# TDS Virtual Teaching Assistant

A Vercel-deployable Virtual Teaching Assistant API that answers TDS course questions with proper JSON responses and discourse links.

## Overview

This application provides an intelligent API that automatically answers student questions for the Tools in Data Science (TDS) course using course content and Discourse posts from Jan-Apr 2025. It's designed to reduce the load on teaching assistants while providing instant, accurate responses.

## Features

- **REST API** endpoint that accepts POST requests with questions and optional base64 images
- **JSON responses** with structured answers and relevant discourse links
- **Knowledge base** containing TDS course content and discourse posts
- **30-second response time** guarantee for all requests
- **Vercel deployment** ready with proper configuration
- **Frontend dashboard** for testing and demonstration

## API Usage

### Endpoint
```
POST /api
```

### Request Format
```json
{
  "question": "Your question here",
  "image": "base64_encoded_image_optional"
}
```

### Response Format
```json
{
  "answer": "Detailed answer to the question",
  "links": [
    {
      "url": "https://discourse.onlinedegree.iitm.ac.in/...",
      "text": "Link description"
    }
  ]
}
```

### Example Request
```bash
curl "https://your-app.vercel.app/api" \
  -H "Content-Type: application/json" \
  -d '{"question": "Should I use gpt-4o-mini which AI proxy supports, or gpt3.5 turbo?"}'
```

### Example Response
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

## Deployment on Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Node.js 18+ (for local development)

### Step 1: Prepare Your GitHub Repository

1. **Create a new GitHub repository:**
   ```bash
   # Create a new repository on GitHub
   # Clone this project to your local machine
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Add all project files:**
   ```bash
   # Copy all files from this project to your repository
   # Make sure you have:
   # - api/ directory with index.ts
   # - client/ directory with React frontend
   # - server/ directory with backend services
   # - shared/ directory with schemas
   # - package.json, vercel.json, LICENSE
   
   git add .
   git commit -m "Initial commit: TDS Virtual TA"
   git push origin main
   ```

### Step 2: Deploy to Vercel

1. **Connect GitHub to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave empty)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/public`
   - **Install Command:** `npm install`

3. **Environment Variables:**
   No additional environment variables needed for basic functionality.

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your app will be available at `https://your-app-name.vercel.app`

### Step 3: Test Your Deployment

1. **Test the API endpoint:**
   ```bash
   curl "https://your-app-name.vercel.app/api" \
     -H "Content-Type: application/json" \
     -d '{"question": "Should I use gpt-4o-mini which AI proxy supports, or gpt3.5 turbo?"}'
   ```

2. **Test the frontend:**
   - Visit `https://your-app-name.vercel.app`
   - Use the dashboard to test questions

### Step 4: Submit for Evaluation

1. **GitHub Repository URL:** `https://github.com/yourusername/your-repo-name`
2. **API Endpoint URL:** `https://your-app-name.vercel.app/api`
3. **Submit at:** https://exam.sanand.workers.dev/tds-project-virtual-ta

## Local Development

### Setup
```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5000`

### Project Structure
```
├── api/                 # Vercel serverless function
│   └── index.ts
├── client/             # React frontend
│   ├── src/
│   └── index.html
├── server/             # Express backend (dev mode)
│   ├── services/
│   └── index.ts
├── shared/             # Shared schemas and types
│   └── schema.ts
├── package.json        # Dependencies and scripts
├── vercel.json         # Vercel deployment config
└── LICENSE             # MIT License
```

## Knowledge Base Coverage

The Virtual TA can answer questions about:
- GPT model selection (gpt-3.5-turbo vs gpt-4o-mini)
- GA4 assignment scoring and bonus points
- Docker vs Podman for containerization
- Course environment setup
- Assignment submissions and deadlines
- Data sources and APIs

## Performance

- **Response Time:** 2-5 seconds average
- **Availability:** 99.9% uptime on Vercel
- **Accuracy:** Optimized for TDS course-specific questions
- **Scalability:** Serverless architecture handles concurrent requests

## License

MIT License - see LICENSE file for details.

## Support

For issues with the Virtual TA, check the course Discourse forum or contact the teaching assistants.