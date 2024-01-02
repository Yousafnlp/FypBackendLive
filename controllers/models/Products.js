import mongoose from "mongoose";


let ProductSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },

        title: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        }
    }
)


const product = mongoose.model("products",ProductSchema);
export default product;
