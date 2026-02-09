# How to Run Interactive Quiz Hub

## Quick Start

### 1️⃣ Development Mode (Recommended)

Run both frontend and backend with hot-reload:

```bash
# From root directory
npm run dev:full
```

This starts:
- **Frontend** at `http://localhost:5173` (Vite dev server)
- **Backend** at `http://localhost:3000` (Express API)

### 2️⃣ Production Mode

Build and run as production:

```bash
# From root directory
npm start
```

This will:
1. Build frontend → `frontend/dist/`
2. Start backend on `http://localhost:3000`
3. Backend serves the built frontend

---

## Individual Commands

### Frontend Only
```bash
cd frontend
npm run dev
```
Access at: `http://localhost:5173`

### Backend Only
```bash
cd backend
npm run dev      # With nodemon (auto-restart)
# OR
npm start        # Without nodemon
```
Access at: `http://localhost:3000`

---

## Troubleshooting

### ❌ Port 3000 already in use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find the process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or restart your computer
```

### ❌ nodemon not found

**Error:**
```
'nodemon' is not recognized as an internal or external command
```

**Solution:**
```bash
cd backend
npm install
```

### ❌ MongoDB connection error

**Error:**
```
MongoDB Connection Error
```

**Solution:**
1. Check `backend/.env` has correct `MONGO_URL`
2. Verify your IP is whitelisted in MongoDB Atlas
3. Check your internet connection

---

## Environment Setup

### Required Files

**`backend/.env`** (create if missing):
```env
MONGO_URL=mongodb+srv://your-username:password@cluster.mongodb.net/quiz-hub
JWT_SECRET=your-secret-key
PORT=3000
FRONTEND_URL=http://localhost:5173
```

---

## Common Workflows

### First Time Setup
```bash
# 1. Install all dependencies
npm install
npm install --workspaces

# 2. Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB credentials

# 3. Start development servers
npm run dev:full
```

### Daily Development
```bash
# Just run this:
npm run dev:full
```

### Testing Production Build
```bash
npm start
```

### Deploying to Render
```bash
git add .
git commit -m "Your changes"
git push origin main
```

---

## Available Scripts

### Root Level
- `npm run dev:full` - Run frontend + backend together
- `npm run dev:frontend` - Run only frontend
- `npm run dev:backend` - Run only backend
- `npm run build:frontend` - Build frontend
- `npm start` - Production mode
- `npm test` - Run tests

### Frontend (cd frontend)
- `npm run dev` - Dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

### Backend (cd backend)
- `npm run dev` - Dev with nodemon
- `npm start` - Production mode

---

**Need help? Check the [README.md](README.md) for full documentation!**
