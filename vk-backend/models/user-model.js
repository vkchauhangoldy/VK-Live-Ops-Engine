const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    username: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['admin', 'guest'],
        default: 'guest'
    },
    age: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    installed_days: {
        type: Number,
        default: 1
    },
    pricing: {
        currency: {
            type: String,
            enum: ['coins', 'gems'],
            default: () => {
                const currencies = ['coins', 'gems'];
                return currencies[Math.floor(Math.random() * currencies.length)];
            },
        },
        cost: {
            type: Number,
            default: ((this.currency == "gems") ? 1000 : 20)
        },
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);
