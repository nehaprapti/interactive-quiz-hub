const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');

const app = express();

// CORS configuration
const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:5173',
    'https://interactive-quiz-hub.onrender.com', // Production URL
    process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });

// Root route (only in development)
if (process.env.NODE_ENV !== 'production') {
    app.get('/', (req, res) => {
        res.json({
            message: 'Quiz Hub API Server',
            status: 'running',
            endpoints: {
                health: '/api/health',
                auth: {
                    signup: 'POST /api/auth/signup',
                    login: 'POST /api/auth/login'
                },
                quiz: {
                    submitScore: 'POST /api/quiz/submit-score',
                    leaderboard: 'GET /api/quiz/leaderboard'
                }
            }
        });
    });
}

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', quizRoutes);

// Serve static files from React app (production)
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(distPath));

    // All other routes serve the React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
}


// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
