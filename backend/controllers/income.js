const incomeRouter = require('express').Router();
const incomeSchema = require('../models/income');

incomeRouter.post('/', async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = new incomeSchema({
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
        if (amount <= 0 || amount !== 'number') {
            return res.status(400).json({ error: 'Amount must be a positive number'});
        };

        const savedIncome = await income.save();
        res.status(201).json(savedIncome);

    } catch (error) {
        res.status(500).json({ error: 'server error' });
    };
});

incomeRouter.get('/', async (req, res) => {
    try {
        const incomes = await incomeSchema.find({}).sort({createdAt: -1});
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ error: 'server error' });
    };
});

incomeRouter.delete('/', async (req, res) => {
    const { id } = req.params;
    incomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'income deleted' });
        })
        .catch((error) => {
            res.status(500).json(error)
        })

});

module.exports = incomeRouter;