const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // הפורט ש-Render מספק

app.use(cors());
app.use(express.json());

// מסלול לבדיקה אם השרת רץ
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// מסלול ה-Proxy של Agoda
app.post('/proxy/hotels', async (req, res) => {
    const endpoint = 'https://affiliateapi7643.agoda.com/affiliateservice/lt_v1';

    try {
        const response = await axios.post(endpoint, req.body, {
            headers: {
                'Authorization': 'Bearer 1930862:a9a5d74a-6015-4531-9a26-9833f483ab83',
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching hotels:', error.message);
        res.status(500).send('Error fetching hotels');
    }
});

// הפעלת השרת
app.listen(port, () => {
    console.log(`Proxy server running on port ${port}`);
});
