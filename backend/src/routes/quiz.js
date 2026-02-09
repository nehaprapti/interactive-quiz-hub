const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST /api/quiz/submit-score
// @desc    Submit quiz score
// @access  Private
router.post('/submit-score', auth, async (req, res) => {
    try {
        const { quizId, quizTitle, score, totalQuestions, correctAnswers, maxStreak, totalTime } = req.body;

        // Validation
        if (!quizId || !quizTitle || score === undefined || !totalQuestions || correctAnswers === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Add score to user's quiz scores
        const user = await User.findById(req.user._id);

        user.quizScores.push({
            quizId,
            quizTitle,
            score,
            totalQuestions,
            correctAnswers,
            maxStreak: maxStreak || 0,
            totalTime: totalTime || 0,
            completedAt: new Date()
        });

        await user.save();

        res.json({
            message: 'Score submitted successfully',
            score: user.quizScores[user.quizScores.length - 1]
        });
    } catch (error) {
        console.error('Submit score error:', error);
        res.status(500).json({ message: 'Server error while submitting score' });
    }
});

// @route   GET /api/quiz/leaderboard
// @desc    Get leaderboard data
// @access  Public
router.get('/leaderboard', async (req, res) => {
    try {
        // Get all users with their quiz scores
        const users = await User.find({}, '-password').lean();

        // Format leaderboard data
        const leaderboard = [];

        users.forEach(user => {
            if (user.quizScores && user.quizScores.length > 0) {
                user.quizScores.forEach(score => {
                    leaderboard.push({
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: `${user.firstName} ${user.lastName}`,
                        quizId: score.quizId,
                        quizTitle: score.quizTitle,
                        score: score.score,
                        totalQuestions: score.totalQuestions,
                        correctAnswers: score.correctAnswers,
                        maxStreak: score.maxStreak || 0,
                        totalTime: score.totalTime || 0,
                        completedAt: score.completedAt,
                        accuracy: Math.round((score.correctAnswers / score.totalQuestions) * 100)
                    });
                });
            }
        });

        // Sort by score descending
        leaderboard.sort((a, b) => b.score - a.score);

        res.json({ leaderboard });
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ message: 'Server error while fetching leaderboard' });
    }
});

// @route   GET /api/quiz/my-scores
// @desc    Get current user's quiz scores
// @access  Private
router.get('/my-scores', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('quizScores');

        res.json({
            scores: user.quizScores.sort((a, b) => b.completedAt - a.completedAt)
        });
    } catch (error) {
        console.error('Get scores error:', error);
        res.status(500).json({ message: 'Server error while fetching scores' });
    }
});

module.exports = router;
