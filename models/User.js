import mongoose from "mongoose";




let Schema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true
        },

        lname: {
            type: String,
            required: [true,"fill address first"],
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        cpassword: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            required: true
        },
        gender:{
            type: String,
            required: true
        },
        countery :{
            type: String,
            required: true
        },
        role :{
            type: Number,
            default: 0
        }
    },
    {timestamps: true}
)


const users = mongoose.model("users",Schema);
export default users;




