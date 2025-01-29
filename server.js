const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // מאפשר שימוש במשתני סביבה

const app = express();
const port = process.env.PORT || 3000; // שימוש בפורט של Render או ברירת מחדל

// API Key ו-Site ID מתוך משתני סביבה (שימושי לאבטחה)
const AGODA_API_KEY = process.env.AGODA_API_KEY || '1930862:a9a5d74a-6015-4531-9a26-9833f483ab83';
const AGODA_SITE_ID = process.env.AGODA_SITE_ID || ''; // אם צריך Site ID

app.use(cors());
app.use(express.json());

// 🔹 בדיקת חיבור לשרת
app.get('/', (req, res) => {
    res.send('✅ Server is running on Render!');
});

// 🔹 נתיב GET לבדיקה בלבד
app.get('/proxy/hotels', (req, res) => {
    res.send('🚀 This is the Agoda Proxy. Use POST requests to fetch hotel data.');
});

// 🔹 מסלול ה-Proxy של Agoda (שימוש בבקשת `POST`)
app.post('/proxy/hotels', async (req, res) => {
    const endpoint = 'https://affiliateapi7643.agoda.com/affiliateservice/lt_v1';

    console.log("🔍 קיבלנו בקשה עם הנתונים הבאים:", req.body);

    try {
        const headers = {
            'Agoda-Api-Key': AGODA_API_KEY, // שימוש בכותרת הנכונה
            'Content-Type': 'application/json'
        };

        // הוספת Site ID אם נדרש
        if (AGODA_SITE_ID) {
            headers['Agoda-Site-Id'] = AGODA_SITE_ID;
        }

        const response = await axios.post(endpoint, req.body, { headers });

        console.log("✅ תגובה מאגודה:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error('❌ שגיאה בשליפת מלונות:', error.message);
        res.status(error.response?.status || 500).send(error.response?.data || 'Error fetching hotels');
    }
});

// 🔹 הפעלת השרת
app.listen(port, () => {
    console.log(`🚀 Proxy server running on port ${port}`);
});
