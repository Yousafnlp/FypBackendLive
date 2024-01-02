import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        _id: false,  // Specify _id as false to prevent generating Object IDs
        id: {
          type: Number,
          required: true
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
        category: {
          type: String,
          required: true
        },
      },
    ],

    fname: {
      type: String,
      required: true
    },

    lname: {
      type: String,
      required: [true, "fill address first"],
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      required: true
    },

  }
);
const Order = mongoose.model('orderCart', orderSchema);

export default Order;
