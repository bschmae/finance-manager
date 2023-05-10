const express = require('express');
const app = express();
const cors = require('cors');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const incomeRouter = require('./controllers/income');
const expenseRouter = require('./controllers/expenses');

const mongoose = require('mongoose');


mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connecting to MongoDB', error.message);
});

app.use(cors());
app.use(express.json())
app.use(middleware.requestLogger);

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/incomes', incomeRouter);
app.use('/api/expenses', expenseRouter);

module.exports = app;