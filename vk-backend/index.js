const express = require("express");
const app = express();

//AL ROUTES 
const registerRouter = require("./routes/register")
const loginRouter = require("./routes/login");
const offerRouter = require("./routes/admin-offer")

//OTHER LIBRARIES
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const cors = require("cors");

const conn = require("./config/connection");


const PORT = 3030 || process.env.PORT


//MIDDELWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(req.url)
    try {
        if (req.url == "/api/v4/login" || req.url == "/api/v4/signup") {
            next();
        } else {
            let token = req.headers.authorization;
            jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
                if (err) {
                    return res.status(400).json({
                        message: err.message
                    })
                }
                res.user = decoded.data;
                next()
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

})


//TESTING ROUTE
app.get("/", (req, res) => {
    res.send(" APP WORKING")
})


app.use("/", registerRouter);
app.use("/", loginRouter);
app.use("/", offerRouter)

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})