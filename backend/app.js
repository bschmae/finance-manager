const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('conneting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connecting to MongoDB', error.message);
});

app.use(express.json())
app.use(cors);

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

module.exports = app;