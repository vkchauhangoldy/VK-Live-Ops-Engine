const express = require("express");
const router = express.Router();
const offerModel = require("../models/offer-model")
const userInfo = require("../models/user-model")
const multer = require("multer");
const path = require("path");



//MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `uploads`)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${file.originalname}`)
    }
});
const upload = multer({ storage: storage });


//CREATE NEW OFFER
router.post("/api/offers", upload.single("offer_image"), async (req, res) => {
    console.log("here")
    try {
        const isAdmin = await userInfo.findById(res.user);
        if (isAdmin.role == "admin") {
            const { offer_id, offer_title, offer_description, offer_sort_order,
                days_of_week, dates_of_month, months_of_year, item_id, quantity } = req.body;

            const offerDetails = await offerModel.create({
                offer_id,
                offer_title,
                offer_description,
                offer_image: req.file.filename,
                offer_sort_order,
                content: {
                    item_id,
                    quantity,
                },
                schedule: {
                    days_of_week,
                    dates_of_month,
                    months_of_year
                }
            })
            console.log(offerDetails)
            return res.status(200).json({
                message: "success",
                _id: isAdmin._id,
                offerDetails
            });
        } else {
            return res.status(401).json({
                message: "only admin can access"
            })
        }
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }
});


//IMAGE FROM FILE
router.get("/api/offerlist/:fileName", (req, res) => {
    return res.sendFile(path.join(__dirname, `../uploads/${req.params.fileName}`))
})


//ALL OFFERLIST 
router.get("/api/offerlist", async (req, res) => {
    try {
        const offerlist = await offerModel.find();
        return res.status(200).json({
            message: "success",
            Alloffer: offerlist
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
})


//UPDATE EXISTINNG OFFER
router.put("/api/offers/:offerId", async (req, res) => {
    try {
        const isAdmin = await userInfo.findById(res.user);
        if (isAdmin.role == "admin") {
            const { offerId } = req.params;
            // console.log(offerId)
            const { offer_id, offer_title, offer_description, offer_sort_order,
                days_of_week, dates_of_month, months_of_year, item_id, quantity } = req.body;

            const updateFields = {
                offer_id,
                offer_title,
                offer_description,
                offer_sort_order,
                content: {
                    item_id,
                    quantity,
                },
                schedule: {
                    days_of_week,
                    dates_of_month,
                    months_of_year
                }
            }
            const updatedOffer = await offerModel.updateOne({ offerId }, updateFields);
            return res.status(200).json({
                message: "success",
                offerDetails: updatedOffer
            });
        } else {
            return res.status(401).json({
                message: "only admin can access"
            })
        }
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }
});




module.exports = router;