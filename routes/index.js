const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_VALUE = process.env.API_KEY_VALUE;
const API_HOST_NAME = process.env.API_HOST_NAME;
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN;

router.get('/get-all-coins', async (req, res) => {
    const options = {
        url: `${API_BASE_URL}/coins/markets`,
        method: 'GET',
        headers: {
            // "X-RapidAPI-Key": API_KEY_VALUE,
            "X-RapidAPI-Host": API_HOST_NAME,
            "Access-Control-Allow-Origin": ALLOW_ORIGIN
        },
        params: {
            vs_currency: 'usd',
            page: 1,
            per_page: 250,
            order: 'market_cap_desc',
        },
    }

    await axios.request(options)
        .then(response => {
            const responseData = response.data;
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(error.response.status).json(error.response.statusText);
    });
});


router.get('/get-single-coin/:coinId', async (req, res) => {
    const coinId = req.params.coinId;

    const options = {
        url: `${API_BASE_URL}/coins/${coinId}`,
        method: 'GET',
        cache: 'no-cache',
        headers: {
            // "X-RapidAPI-Key": API_KEY_VALUE,
            "X-RapidAPI-Host": API_HOST_NAME,
            "Access-Control-Allow-Origin": ALLOW_ORIGIN
        },
        params: {
            localization: false,
            tickers: false,
            developer_data: false,
            sparkline: true,
        },
    }

    await axios.request(options)
        .then(response => {
            const responseData = response.data;
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(error.response.status).json(error.response.statusText);
        });
})

module.exports = router;