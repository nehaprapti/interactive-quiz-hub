# How to Start the Application

## Step 1: Start Backend Server
Open a terminal and run:
```bash
cd e:\interactive-quiz-hub
node server/index.js
```

You should see:
```
🚀 Server running on http://localhost:3000
✅ MongoDB Connected
```

**If MongoDB connection fails:**
- Check that the database URL in `.env` is correct
- Verify your IP is whitelisted in MongoDB Atlas
- Make sure database credentials are valid

## Step 2: Start Frontend (Already Running)
The frontend Vite dev server is already running on port 8080.

If you need to restart it:
```bash
npm run dev
```

## Step 3: Test the Application
1. Open browser to: http://localhost:8080
2. Click "Sign Up" to create an account
3. Complete a quiz
4. Check the leaderboard

---

## Alternative: Run Both Together
Instead of running them separately, you can run both with one command:
```bash
npm run dev:full
```

This runs both the frontend and backend concurrently.
