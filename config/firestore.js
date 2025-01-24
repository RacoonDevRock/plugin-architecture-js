const admin = require("firebase-admin");
require("dotenv").config();

// Initializing Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
});

// Initialize Firestore
const db = admin.firestore();

// Export Firestore to use in other files
module.exports = db;