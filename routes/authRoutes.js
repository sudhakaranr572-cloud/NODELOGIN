const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// ========================================
// REGISTER
// ========================================

router.post("/register", async (req, res) => {

    try {

        console.log("REGISTER BODY:");
        console.log(req.body);


        const {
            name,
            email,
            password
        } = req.body;


        if (!name || !email || !password) {

            return res.status(400).json({

                message:
                    "Name, email and password are required"

            });

        }


        const existingUser =
            await User.findOne({
                email: email.toLowerCase()
            });


        if (existingUser) {

            return res.status(400).json({

                message:
                    "Email already registered"

            });

        }


        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        const newUser = new User({

            name: name,

            email:
                email.toLowerCase(),

            password:
                hashedPassword

        });


        await newUser.save();


        console.log(
            "User registered:",
            newUser.email
        );


        res.status(201).json({

            message:
                "Registration successful"

        });


    } catch (error) {

        console.log(
            "REGISTER ERROR:",
            error
        );


        res.status(500).json({

            message:
                "Registration server error",

            error:
                error.message

        });

    }

});


// ========================================
// LOGIN
// ========================================

router.post("/login", async (req, res) => {

    try {

        console.log("LOGIN BODY:");
        console.log(req.body);


        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({

                message:
                    "Email and password are required"

            });

        }


        const user =
            await User.findOne({

                email:
                    email.toLowerCase()

            });


        if (!user) {

            return res.status(400).json({

                message:
                    "User not found"

            });

        }


        const passwordMatch =
            await bcrypt.compare(

                password,

                user.password

            );


        if (!passwordMatch) {

            return res.status(400).json({

                message:
                    "Incorrect password"

            });

        }


        if (!process.env.JWT_SECRET) {

            return res.status(500).json({

                message:
                    "JWT_SECRET is missing in .env"

            });

        }


        const token =
            jwt.sign(

                {
                    userId:
                        user._id
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:
                        "1d"
                }

            );


        user.lastLogin =
            new Date();

        await user.save();


        console.log(
            "Login successful:",
            user.email
        );


        res.status(200).json({

            message:
                "Login successful",

            token: token,

            user: {

                id:
                    user._id,

                name:
                    user.name,

                email:
                    user.email,

                phone:
                    user.phone,

                address:
                    user.address,

                status:
                    user.status,

                lastLogin:
                    user.lastLogin

            }

        });


    } catch (error) {

        console.log(
            "LOGIN ERROR:"
        );

        console.log(error);


        res.status(500).json({

            message:
                "Login server error",

            error:
                error.message

        });

    }

});


module.exports = router;