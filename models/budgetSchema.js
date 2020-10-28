const mongoose = require("mongoose")

// Stackoverflow: https://stackoverflow.com/questions/20766360/whats-the-meaning-of-trim-when-use-in-mongoose
const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$$/i).test(v)


const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        validator: [colorValidator, "Invalid Color"],
        required: true,
    }
}, {collection: "myBudget"});

module.exports = mongoose.model("myBudget", budgetSchema);