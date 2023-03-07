const express = require("express")
const router = express.Router();
const userInfo = require("../models/user-model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { body, validationResult } = require('express-validator');
const { userSignupValidation } = require("../config/utility")


//TESTING ROUTE
router.get("/v4/signup", (req, res) => {
    res.send("signup Route working!!")
})


//NEW USER
router.post("/api/v4/signup",
    userSignupValidation,
    async (req, res) => {
        //DESTRUCTURING OF REQ. BODY
        const { username, email, password, role, age, installed_days, pricing } = req.body;
        try {
            //VALIDATION ERROR
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //TO CHECK USERS EXISTANCE
            const isUserExist = await userInfo.find({ email });
            if (isUserExist[0]?.email) {
                return res.status(400).json({
                    message: "User already exist"
                })
            }
            //HASHING THE PASSWORD
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) {
                    return res.status(400).json({
                        message: err.message
                    })
                }
                //USER REGISTERED
                const userData = await userInfo.create({
                    username,
                    email,
                    age,
                    role,
                    installed_days,
                    ...pricing,
                    password: hash,
                })
                return res.status(200).json({
                    message: "sucess",
                    data: userData
                })
            })
        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }

    });


//CHANGE USER PASSWORD 
router.put("/api/v4/user/:emailId",
    async (req, res) => {
        const { emailId } = req.params;
        const { username, email, password, } = req.body;
        try {
            //VALIDATION ERROR
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //FIND USER
            const user = await userInfo.findById(emailId);
            // console.log(user)
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            //COMPARE OLD PASSWORD
            bcrypt.compare(req.body.oldpassword, user.password, function (err, result) {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        message: err.message
                    })
                }
                if (result) {
                    // UPDATE NEW HASHED PASSWORD
                    bcrypt.hash(req.body.newpassword, saltRounds, async function (err, hash) {
                        if (err) {
                            return res.status(400).json({
                                message: err.message
                            })
                        }
                        //UPDATE LOGIC
                        const updatedUser = await userInfo.updateOne({ email }, { $set: { ...req.body, password: hash } });
                        const updatedData = await userInfo.findById({ emailId });
                        return res.status(200).json({
                            message: "updated successfully",
                            data: updatedData
                        })
                    })
                } else {
                    return res.status(400).json({
                        message: "old password is not correct"
                    })
                }

            })
        } catch (e) {
            return res.status(400).json({
                message: e.message
            });
        }
    }
)


//FIND ALL REGISTER USER
router.get("/api/v4/userlist", async (req, res) => {
    try {
        const userlist = await userInfo.find();
        return res.status(200).json({
            message: "success",
            userlist
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
})


//FIND ALL REGISTER USER
router.delete("/api/v4/delete/:id", async (req, res) => {
    try {
        const userlist = await userInfo.findByIdAndDelete({ _id: req.params.id })
        return res.status(200).json({
            message: "deleted",
            userlist
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
})




module.exports = router;