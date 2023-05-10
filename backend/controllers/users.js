const bcrypt = require('bcrypt')
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

userRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!password) {
        return res.status(400).json('Must give password')
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
 });

module.exports = userRouter;