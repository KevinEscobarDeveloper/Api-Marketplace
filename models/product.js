const {Schema, model} = require("mongoose");


const ProductSchema = Schema({
    title:{
        type: String,
        required: true
    },
    price: Number,
    image:{
        type: String,
        default: "default.png"
    },

    created_at:{
        type: Date,
        default: Date.now
    }

})

module.exports = model("Product", ProductSchema);