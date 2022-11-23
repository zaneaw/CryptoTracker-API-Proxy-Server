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

router.get('/*', async (req, res) => {
    try {
        const endpoint = req.query.endpoint ? req.query.endpoint : 'markets';

        // console.log(endpoint)

        const options = {
            url: `${API_BASE_URL}/coins/${endpoint ? endpoint : ''}`,
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

        // console.log(url.parse(req.url, true).query)
        // const params = new URLSearchParams({
        //     ...url.parse(req.url, true).query
        // })

        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${options.url}`)
        }

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

module.exports = router;