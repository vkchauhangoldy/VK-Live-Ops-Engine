const express = require("express")
const router = express.Router();
const userInfo = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//TESTING REQUEST
router.get("/v4/login", (req, res) => {
    res.send("login Route working!!")
})


//NEW USER
router.post("/api/v4/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        //TO CHECK USERS EXISTANCE
        const userData = await userInfo.find({ email });
        // console.log(userData[0].id);
        if (!userData[0]) {
            return res.status(400).json({
                message: "User not exist"
            })
        }
        //HASHED PASSWORD COMPARE
        bcrypt.compare(password, userData[0].password, async function (err, result) {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    message: err
                })
            }
            //SUCESSFULLY LOGIN
            if (result) {

                const Token = await jwt.sign({
                    data: userData[0].id
                }, process.env.SECRET_KEY, { expiresIn: '24h' });

                return res.status(200).json({
                    message: `${userData[0].username}  login successfully`,
                    Token
                })
            } else {
                return res.status(400).json({
                    message: " incorrect password",
                })
            }
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

})






module.exports = router;