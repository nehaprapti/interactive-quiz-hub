/**
 * Database Cleanup Utility
 * 
 * ⚠️  WARNING: This script will DELETE ALL USERS from the database!
 * Use only in development/testing environments.
 * 
 * Usage:
 *   node scripts/clearUsers.js
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const readline = require('readline');

// Import User model
const User = require('../src/models/User');

// Create readline interface for confirmation
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function clearAllUsers() {
    try {
        // Connect to MongoDB
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ Connected to MongoDB\n');

        // Count existing users
        const userCount = await User.countDocuments();
        console.log(`📊 Current user count: ${userCount}`);

        if (userCount === 0) {
            console.log('ℹ️  No users to delete.');
            await mongoose.connection.close();
            process.exit(0);
        }

        // Ask for confirmation
        rl.question(
            `\n⚠️  Are you sure you want to delete ALL ${userCount} user(s)? (yes/no): `,
            async (answer) => {
                if (answer.toLowerCase() === 'yes') {
                    console.log('\n🗑️  Deleting all users...');

                    const result = await User.deleteMany({});

                    console.log(`✅ Successfully deleted ${result.deletedCount} user(s)`);
                    console.log('✨ Database cleared!\n');
                } else {
                    console.log('\n❌ Operation cancelled. No users were deleted.\n');
                }

                // Close connection and exit
                await mongoose.connection.close();
                console.log('👋 Disconnected from MongoDB');
                rl.close();
                process.exit(0);
            }
        );

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        await mongoose.connection.close();
        rl.close();
        process.exit(1);
    }
}

// Run the script
clearAllUsers();
