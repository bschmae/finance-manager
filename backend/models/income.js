const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true,
    },
    type: {
        type: String,
        default: 'income'
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true, 
    }, 
    description: {
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: true});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;