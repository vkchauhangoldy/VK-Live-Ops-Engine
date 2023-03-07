const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    offer_id: { type: String, required: true },
    offer_title: { type: String, required: true },
    offer_description: { type: String },
    offer_image: { type: String, required: true },
    offer_sort_order: { type: Number },
    content: {
        item_id: String,
        quantity: Number,
    },
    schedule: {
        days_of_week: Number,
        dates_of_month: Number,
        months_of_year: Number
    },
});



const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;