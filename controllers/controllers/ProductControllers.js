// import users from "../models/User.js"
import Product from "../models/Products.js"
import Order from "../models/Orders.js"

// setting or posting products
export const setProducts = async (request, response) =>{

    let data = await new Product(request.body);
    let result = await data.save();
    response.send(result)

}

// getting or viewing products
export const getProducts = async (request, response)=>{

    let result = await Product.find();
    response.send(result);
}


// getting single product on the basis of id from mongodb
export const find_product_id = async (request, response) => {

    let result = await Product.findOne({ id: request.params.id })
    response.send(result)
}


// submit cart[{products}{}{}]




export const send_products = async (req, res) => {
  try {
    // const cart = req.body; // Assuming products is an array of product objects

    const {fname,lname,email,gender,cart} =req.body


    // Create a new order with the cart data
    const newOrder = await Order({fname,lname,email,gender, products: cart });

    const savedOrder = await newOrder.save();

    

    res.status(201).send(
      {
        message: 'Order saved successfully',
        order: savedOrder
      }
      );

  } catch (error) {
    console.error('Error saving order', error);
    res.status(500).send(
      { error: 'Failed to save order' }
      );
  }
};


// let data = await new Product(request.body);
// let result = await data.save();
// response.send(result)
