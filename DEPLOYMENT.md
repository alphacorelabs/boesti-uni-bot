# BOUESTI Chatbot - Vercel Deployment Guide

This guide explains how to deploy the BOUESTI admission chatbot to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **OpenAI API Key**: Get your API key from [OpenAI Platform](https://platform.openai.com)
3. **GitHub Repository**: Your code should be in a GitHub repository

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel will automatically detect it as a React/Vite project

### 2. Configure Environment Variables

In your Vercel project settings, add the following environment variable:

**Environment Variable:**

- **Name**: `OPENAI_API_KEY`
- **Value**: ``

**Steps:**

1. Go to Project Settings → Environment Variables
2. Add the `OPENAI_API_KEY` variable
3. Set it for **Production**, **Preview**, and **Development** environments

### 3. Deploy

1. Click **"Deploy"** in Vercel
2. Vercel will automatically:
   - Build the React frontend
   - Deploy the serverless API functions
   - Set up the routing

### 4. Verify Deployment

After deployment, test these endpoints:

**Frontend**: `https://your-project.vercel.app`
**Health Check**: `https://your-project.vercel.app/api/health`
**Chat API**: `https://your-project.vercel.app/api/chat` (POST request)

## Project Structure for Vercel

```
boesti-uni-bot/
├── api/                    # Vercel serverless functions
│   ├── chat.js            # Main chat API endpoint
│   └── health.js          # Health check endpoint
├── src/                   # React frontend source
├── public/                # Static assets
├── vercel.json           # Vercel configuration
├── .vercelignore         # Files to ignore during deployment
└── package.json          # Dependencies and build scripts
```

## Configuration Files

### vercel.json

- Configures build settings
- Sets up API routes
- Defines function timeouts
- Maps environment variables

### .vercelignore

- Excludes backend/ folder (Express.js version)
- Excludes development files
- Reduces deployment size

## Features in Production

✅ **Frontend**: React app with glassmorphism UI
✅ **Backend**: Serverless functions for chat API
✅ **AI Integration**: OpenAI GPT-3.5-turbo with streaming
✅ **BOUESTI Knowledge**: Complete university information
✅ **Responsive Design**: Mobile and desktop support
✅ **Real-time Chat**: Streaming responses
✅ **Error Handling**: Graceful fallbacks

## Environment-Specific Behavior

**Development** (`npm run dev:full`):

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001/api`

**Production** (Vercel):

- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-project.vercel.app/api`

## Troubleshooting

### Common Issues:

1. **OpenAI API Key Error**

   - Verify the environment variable is set correctly
   - Check the key has sufficient credits

2. **Function Timeout**

   - OpenAI responses are configured for 30s max
   - Adjust in `vercel.json` if needed

3. **CORS Issues**

   - API functions include proper CORS headers
   - Check browser network tab for errors

4. **Build Failures**
   - Ensure all dependencies are in package.json
   - Check build logs in Vercel dashboard

## Monitoring

- **Vercel Analytics**: Automatic visitor tracking
- **Function Logs**: Available in Vercel dashboard
- **OpenAI Usage**: Monitor in OpenAI dashboard

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed
4. SSL certificates are automatically provisioned

## Security Notes

- OpenAI API key is stored securely in Vercel environment variables
- API functions include rate limiting and error handling
- Frontend uses HTTPS in production
- No sensitive data is logged or exposed

---

**Deployment URL**: Will be provided after successful Vercel deployment
**Developer**: Egbeyemi Adeniyi Olorunfemi - BOUESTI Computer Science
