# Render Deployment Troubleshooting

## "Cannot GET /" Error - Diagnosis

### Step 1: Identify Which Service
Check the URL showing the error:
- `https://quiz-hub-backend-xxx.onrender.com` → Backend (API) - This is **normal**, backend is API only
- `https://quiz-hub-frontend-xxx.onrender.com` → Frontend - **Problem**, should show quiz app

### Step 2: If Backend Shows Error
✅ **FIXED** - I added a root route. The backend will now show:
```json
{
  "message": "Quiz Hub API Server",
  "status": "running",
  ...
}
```

### Step 3: If Frontend Shows Error

#### Check Build Logs (Most Common)
1. Go to Render Dashboard → `quiz-hub-frontend`
2. Click "Logs" tab
3. Look for build errors

**Common build errors:**
```
Error: Cannot find module 'vite'
→ Fix: Make sure package.json is committed to Git

Error: process is not defined  
→ Fix: This is normal in production, ignore if build succeeds

Build succeeded but deploy failed
→ Fix: Check "Publish directory" is `dist` not `/dist`
```

#### Verify Configuration

**Render Dashboard Settings:**
```
Service Type: Static Site (NOT Web Service)
Build Command: npm install && npm run build
Publish Directory: dist
```

**Environment Variables:**
```
VITE_API_URL=https://your-backend-url.onrender.com
```
⚠️ **NO trailing slash!**

#### Manual Deployment
If using `render.yaml`, the frontend should be `Static Site` not `Web Service`:

**Option 1: Use Render Dashboard (Recommended)**
- Delete the frontend service
- Create new "Static Site" manually
- Configure as shown above

**Option 2: Fix render.yaml**
Your current config has issues. The frontend should be:
```yaml
- type: web
  name: quiz-hub-frontend
  env: static  # Add this line
  buildCommand: npm install && npm run build
  staticPublishPath: ./dist
```

### Step 4: Test Locally First
Before deploying, test the production build locally:

```bash
# Build production version
npm run build

# Serve the dist folder  
npx serve dist
```

Visit http://localhost:3000 - should work!

### Step 5: Check _redirects File
Make sure `public/_redirects` exists with:
```
/*    /index.html   200
```

This ensures all routes work (not just `/`).

---

## Quick Fix Checklist

- [ ] Frontend is "Static Site" type (not Web Service)
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variable `VITE_API_URL` is set (no trailing slash)
- [ ] `public/_redirects` file exists
- [ ] Build logs show success
- [ ] Backend URL returns JSON (not "Cannot GET /")

---

## Still Not Working?

**Share with me:**
1. Screenshot of Render build logs
2. Which URL shows "Cannot GET /" (backend or frontend?)
3. Render service type (Web Service or Static Site?)
4. Environment variables you've set

I'll help you fix it! 🚀
