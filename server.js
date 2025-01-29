const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

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

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
