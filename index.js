const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 5443;

const app = express();

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins
    max: 500
});

// Set static folder
// app.use(express.static('public'));

app.use(limiter);
app.set('trust proxy', 1);

// Routes
app.use('/api', require('./routes/index.js'));

// Enable cors
app.use(cors());

app.use((req, res, next) => {
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
