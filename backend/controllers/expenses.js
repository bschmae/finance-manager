const expenseRouter = require('express').Router();
const expenseSchema = require('../models/expense');

expenseRouter.post('/', async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const expense = new expenseSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ error: 'All fields are required'});
        };
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ error: 'Amount must be a positive number'});
        };

        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);

    } catch (error) {
        res.status(500).json({ error: 'server error' });
    };
});

expenseRouter.get('/', async (req, res) => {
    try {
        const expense = await expenseSchema.find({}).sort({createdAt: -1});
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'server error' });
    };
});

expenseRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    expenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ message: 'expense deleted' });
        })
        .catch((error) => {
            res.status(500).json(error)
        })

});

module.exports = expenseRouter;