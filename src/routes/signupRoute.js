const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, type } = req.body;

    try {
        console.log('Signup Form Details:');
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
        console.log('User Type:', type);

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists", alert: false });
        }

        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password,
            type,
        });

        await newUser.save();

        const userResponse = {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            type: newUser.type,
        };

        res.status(200).json({ message: "User created successfully", alert: true, user: userResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
