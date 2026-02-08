# Deploying to Render

This guide will help you deploy the Interactive Quiz Hub to Render with separate frontend and backend services.

## Prerequisites

1. **GitHub Account** - Your code must be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas** - Free MongoDB database (already configured)

---

## Step-by-Step Deployment

### 1. Push Code to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create Backend Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `quiz-hub-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `node server/index.js`
   - **Instance Type**: Free

5. **Add Environment Variables** (click "Advanced"):
   ```
   MONGO_URL=mongodb+srv://nehapraptip_db_user:7VCTOjTLZNRYE1rd@cluster0.7uiee9x.mongodb.net/quiz-hub?retryWrites=true&w=majority
   
   JWT_SECRET=<generate-new-secret>
   
   NODE_ENV=production
   
   FRONTEND_URL=<will-add-after-frontend-deploy>
   ```

   **Generate JWT_SECRET** by running locally:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. Click **"Create Web Service"**
7. **Copy the backend URL** (e.g., `https://quiz-hub-backend.onrender.com`)

### 3. Create Frontend Service on Render

1. Click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure:
   - **Name**: `quiz-hub-frontend`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variable**:
   ```
   VITE_API_URL=<your-backend-url>
   ```
   Use the backend URL from step 2 (without trailing slash)
   Example: `https://quiz-hub-backend.onrender.com`

5. Click **"Create Static Site"**
6. **Copy the frontend URL** (e.g., `https://quiz-hub.onrender.com`)

### 4. Update Backend Environment Variable

1. Go back to your **Backend Service**
2. Go to **Environment** tab
3. Add/Update the `FRONTEND_URL` variable:
   ```
   FRONTEND_URL=<your-frontend-url>
   ```
4. Click **"Save Changes"** - This will trigger a redeploy

### 5. Verify Deployment

#### Backend Health Check
Visit: `https://quiz-hub-backend.onrender.com/api/health`

Should return:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

#### Frontend
Visit your frontend URL and test:
- ✅ Signup works
- ✅ Login works
- ✅ Quiz completion saves scores
- ✅ Leaderboard displays data

---

## Important Notes

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- Upgrade to paid plan for always-on services

### Database
- MongoDB Atlas connection string is already configured
- Make sure your IP whitelist includes **0.0.0.0/0** (all IPs) for Render to connect

### Troubleshooting

**Backend Won't Start:**
- Check logs in Render dashboard
- Verify MongoDB connection string
- Ensure all environment variables are set

**Frontend Can't Connect to Backend:**
- Check `VITE_API_URL` is correct (no trailing slash)
- Verify CORS is allowing your frontend URL
- Check browser console for errors

**MongoDB Connection Fails:**
- Whitelist all IPs (0.0.0.0/0) in MongoDB Atlas
- Verify connection string includes database name
- Check username/password are correct

---

## Environment Variables Reference

### Backend (`quiz-hub-backend`)
| Variable | Example | Required |
|----------|---------|----------|
| `MONGO_URL` | `mongodb+srv://user:pass@cluster.mongodb.net/quiz-hub` | ✅ |
| `JWT_SECRET` | `<random-32-byte-hex>` | ✅ |
| `NODE_ENV` | `production` | ✅ |
| `FRONTEND_URL` | `https://quiz-hub.onrender.com` | ✅ |

### Frontend (`quiz-hub-frontend`)
| Variable | Example | Required |
|----------|---------|----------|
| `VITE_API_URL` | `https://quiz-hub-backend.onrender.com` | ✅ |

---

## Updating Your App

Render automatically redeploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Your update message"
git push origin main
```

Both services will automatically rebuild and deploy! 🚀

---

## Alternative: One-Click Deploy

If you added `render.yaml` to your repository, you can use:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

> **Note**: You'll still need to manually set environment variables after deployment.
