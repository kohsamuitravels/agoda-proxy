const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // חובה להשתמש ב-process.env.PORT ב-Render

app.use(cors());
app.use(express.json());

// בדיקת חיבור לשרת
app.get('/', (req, res) => {
    res.send('✅ Server is running on Render!');
});

// מסלול GET רק לבדיקה (לא מבצע חיפוש באגודה)
app.get('/proxy/hotels', (req, res) => {
    res.send('🚀 This is the Agoda Proxy. Use POST requests to fetch hotel data.');
});

// מסלול ה-Proxy של Agoda (שימוש בבקשת `POST`)
app.post('/proxy/hotels', async (req, res) => {
    const endpoint = 'https://affiliateapi7643.agoda.com/affiliateservice/lt_v1';

    console.log("🔍 Received request:", req.body);

    try {
        const response = await axios.post(endpoint, req.body, {
            headers: {
                'Authorization': `Bearer ${process.env.AGODA_API_KEY}`,  // שינוי בפורמט
                'Content-Type': 'application/json'
            }
        });

        console.log("✅ Agoda API Response:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error('❌ Error fetching hotels:', error.message);
        res.status(error.response?.status || 500).send(error.response?.data || 'Error fetching hotels');
    }
});


// הפעלת השרת
app.listen(port, () => {
    console.log(`🚀 Proxy server running on port ${port}`);
});
