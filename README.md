# Interactive Quiz Hub - Project Structure

## 📁 Folder Structure

```
interactive-quiz-hub/
├── frontend/                    # React Frontend Application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── contexts/           # React contexts (Auth, etc.)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility libraries
│   │   ├── data/               # Frontend data/types
│   │   └── test/               # Frontend tests
│   ├── public/                 # Static assets
│   ├── data/                   # Quiz data (quiz.json)
│   ├── dist/                   # Build output
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.ts          # Vite configuration
│   ├── tsconfig.json           # TypeScript config
│   └── tailwind.config.ts      # TailwindCSS config
│
├── backend/                     # Express Backend API
│   ├── src/
│   │   ├── routes/             # API routes
│   │   ├── models/             # MongoDB models
│   │   ├── middleware/         # Auth middleware, etc.
│   │   └── index.js            # Server entry point
│   ├── package.json            # Backend dependencies
│   └── .env                    # Backend environment variables
│
├── package.json                 # Root workspace manager
├── render.yaml                  # Render deployment config
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd interactive-quiz-hub
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   npm install --workspaces
   ```
   
   Or install individually:
   ```bash
   cd frontend && npm install && cd ..
   cd backend && npm install && cd ..
   ```

3. **Set up environment variables:**
   ```bash
   cp backend/.env.example backend/.env
   ```
   
   Edit `backend/.env` with your MongoDB credentials:
   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=3000
   ```

## 💻 Development

### Run Frontend Only
```bash
npm run dev:frontend
# OR
cd frontend && npm run dev
```
Frontend will run on `http://localhost:5173`

### Run Backend Only
```bash
npm run dev:backend
# OR
cd backend && npm run dev
```
Backend will run on `http://localhost:3000`

### Run Full Stack (Recommended)
```bash
npm run dev:full
```
This runs both frontend and backend concurrently:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

## 🏗️ Building for Production

### Build Frontend
```bash
npm run build:frontend
# OR
cd frontend && npm run build
```

### Start Production Server
```bash
npm start
```
This will:
1. Build the frontend
2. Start the backend in production mode
3. Backend serves the built frontend at `http://localhost:3000`

## 🧪 Testing

```bash
npm test
# OR
cd frontend && npm test
```

## 📦 Available Scripts

### Root Level
- `npm run dev:frontend` - Run frontend dev server
- `npm run dev:backend` - Run backend dev server
- `npm run dev:full` - Run both concurrently
- `npm run build:frontend` - Build frontend for production
- `npm start` - Build frontend and start production server
- `npm run install:all` - Install all dependencies

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Backend
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start server

## 🌐 Deployment to Render

The project is configured for monorepo deployment on Render.

### Deployment Steps

1. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "Restructured project"
   git push
   ```

2. **Render will automatically:**
   - Run `npm install`
   - Build frontend with `npm run build:frontend`
   - Install backend dependencies
   - Start backend with `node backend/src/index.js`
   - Backend serves the built frontend

3. **Environment Variables on Render:**
   Set these in your Render dashboard:
   - `NODE_ENV=production`
   - `MONGO_URL=<your-mongodb-url>`
   - `JWT_SECRET=<your-secret>`
   - `FRONTEND_URL=https://your-app.onrender.com`

## 🔧 Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS + ShadCN UI
- **State Management:** React Context
- **Routing:** React Router
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Password Hashing:** bcryptjs

## 📂 Key Files

- **`frontend/src/contexts/AuthContext.tsx`** - Authentication logic
- **`frontend/src/data/quizData.ts`** - Quiz data processing
- **`backend/src/index.js`** - Express server setup
- **`backend/src/routes/auth.js`** - Auth API endpoints
- **`backend/src/routes/quiz.js`** - Quiz API endpoints
- **`backend/src/models/User.js`** - User MongoDB model
- **`render.yaml`** - Render deployment configuration

## 🐛 Troubleshooting

### Port already in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MongoDB connection issues
- Check your `MONGO_URL` in `backend/.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify network access settings

### Build fails
```bash
# Clean install
rm -rf node_modules frontend/node_modules backend/node_modules
npm install
npm install --workspaces
```

## 📝 License

This project is licensed under the MIT License.
