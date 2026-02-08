# Deploying to Render (Monorepo)

## Overview
This application deploys as a **single web service** where the backend serves both the API and the built React frontend.

---

## Quick Deploy Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Deploy monorepo to Render"
git push origin main
```

### 2. Create Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository

### 3. Configure Service
```
Name: interactive-quiz-hub
Region: Choose closest to you
Branch: main
Root Directory: (leave empty)

Build Command:
npm install && npm run build && cd server && npm install

Start Command:
NODE_ENV=production node server/index.js

Instance Type: Free
```

### 4. Environment Variables
Add these in the "Advanced" section:

```
MONGO_URL=mongodb+srv://nehapraptip_db_user:7VCTOjTLZNRYE1rd@cluster0.7uiee9x.mongodb.net/quiz-hub?retryWrites=true&w=majority

JWT_SECRET=<generate-new-random-secret>

NODE_ENV=production

FRONTEND_URL=https://interactive-quiz-hub.onrender.com

VITE_API_URL=https://interactive-quiz-hub.onrender.com
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Deploy!
Click **"Create Web Service"**

Render will:
1. Install frontend dependencies
2. Build React app to `dist`
3. Install backend dependencies  
4. Start Node.js server
5. Server serves API + static frontend

---

## How It Works

**Development (`npm run dev:full`):**
- Frontend: Vite dev server on port 8080
- Backend: Express server on port 3000
- Separate servers for hot reload

**Production (Render):**
- Frontend: Built to `dist/` folder
- Backend: Serves API on `/api/*` routes
- Backend: Serves React app for all other routes
- **One URL for everything!**

---

## Testing Locally

### Build and serve like production:
```bash
# Build frontend
npm run build

# Start backend (serves API + frontend)
npm start
```

Visit http://localhost:3000 - Should work like production!

---

## Architecture

```
Your Render URL: https://interactive-quiz-hub.onrender.com
├── /api/health          → Backend API
├── /api/auth/*          → Backend API  
├── /api/quiz/*          → Backend API
└── /*                   → React App (from dist/)
```

---

## Environment Variables Reference

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGO_URL` | MongoDB connection string | From Atlas |
| `JWT_SECRET` | Random 32-byte hex | Generate new for production |
| `NODE_ENV` | `production` | Required |
| `FRONTEND_URL` | Your Render URL | Same as app URL |
| `VITE_API_URL` | Your Render URL | Same as app URL |

---

## Troubleshooting

**Build fails:**
- Check build logs in Render
- Verify `npm run build` works locally
- Ensure all dependencies in package.json

**API works but no frontend:**
- Check `dist/` folder exists after build
- Verify NODE_ENV=production is set
- Check server logs for static serving

**Frontend shows but API fails:**
- Check MONGO_URL is correct
- Verify MongoDB IP whitelist (0.0.0.0/0)
- Check backend logs

---

## Updating Your App

```bash
git add .
git commit -m "Update message"
git push origin main
```

Render auto-deploys! 🚀
