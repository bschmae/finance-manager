const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
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
        default: 'expense'
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

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;