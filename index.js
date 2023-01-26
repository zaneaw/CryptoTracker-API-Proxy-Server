const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const apicache = require('apicache');
// const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 5443;

const app = express();

// Init cache
let cache = apicache.middleware;

app.use(cache('10 seconds'));

app.set('trust proxy', 1);

// Routes
app.use('/api', require('./routes/index.js'));

// Enable cors
app.use(cors());

app.use((req, res) => {
    if (!req.secure) {
        res.redirect('https://' + req.headers.host + req.url);
    };
});

// const options = {
//     key: fs.readFileSync('./keys/key.pem'),
//     cert: fs.readFileSync('./keys/cert.pem')
// };


// https.createServer(options, app).listen(PORT);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
