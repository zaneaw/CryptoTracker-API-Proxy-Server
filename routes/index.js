const express = require('express');
const router = express.Router();
const axios = require('axios');
// const apicache = require('apicache');

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_VALUE = process.env.API_KEY_VALUE;
const API_HOST_NAME = process.env.API_HOST_NAME;
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN;

// Init cache
// let cache = apicache.middleware;

router.get('/get-all-coins', async (req, res) => {
    const options = {
        url: `${API_BASE_URL}/coins/markets`,
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": API_KEY_VALUE,
            "X-RapidAPI-Host": API_HOST_NAME,
            "Access-Control-Allow-Origin": ALLOW_ORIGIN
        },
        params: {
            vs_currency: 'usd',
            page: 1,
            per_page: 100,
            order: 'market_cap_desc',
        },
    }
    
    try {
        const data = await axios.request(options)
            .then(res => {
                const resData = res.data;
                // console.log(resData);
                // res.status(200).json(data);
                return resData;
            }).catch(error => {
                // console.error(error);
                // res.status(500).json({error})
                return error;
        });

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.get('/get-single-coin/:coinId', async (req, res) => {
    const coinId = req.params.coinId;

    const options = {
        url: `${API_BASE_URL}/coins/${coinId}`,
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": API_KEY_VALUE,
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

    try {
        const data = await axios.request(options)
            .then(res => {
                const resData = res.data;
                // console.log(resData);
                // res.status(200).json(data);
                return resData;
            }).catch(error => {
                // console.error(error);
                // res.status(500).json({error})
                return error;
        });

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error });
    }
})

module.exports = router;