const jwt = require("jsonwebtoken");
const express = require("express");
const userModel = require("../models/userModel");
const logedinMiddleware = require("../middleware/isLoggedIn");
const app = express();

app.use(logedinMiddleware);
module.exports = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await userModel.findOne({ email });

        if (result) {
            if (result.password === password) {
                const token = jwt.sign(
                    {
                        userId: result._id,
                        email: result.email,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        type: result.type,
                    },
                    process.env.SECRET
                );

                res.json({
                    token,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    type: result.type,
                    message: "Login success",
                    alert: true,
                });
            } else {
                res.status(401).json({ message: "Incorrect password", alert: false });
            }
        } else {
            res.status(404).json({ message: "Email not found", alert: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" + err });
    }
};
