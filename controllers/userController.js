import JWT from "jsonwebtoken"
import { comparePassword, hashPassword } from "../helpers/UserHelper.js"
import users from "../models/User.js"
import multer from "multer"
import images from "../models/image.js"




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,  uniqueSuffix + file.originalname )
      }
    }
  )
  
export  const upload = multer({ storage: storage })

export const controller =(request,response)=>{
        console.log("hello from home")
        response.send("hello from home......../")
    }

 
export const uploadImg = async (req, res) => {
    try {
        const { path } = req.file;

        console.log(req.body);
        console.log(req.file);

        const img = new images({ img: path });
        await img.save();

        res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Error during image upload:', error);
        res.status(500).json({ error: 'Internal Server Error', error });
    }
};

export const saveForm = async (request, response) => {

        // let data = await new users(request.body);
        // let result = await data.save();
        // response.send(result);

        try{

            const {fname,lname,email,password,cpassword,dob,gender,countery} =request.body

            if(!fname){
                response.send({"message":"Please enter your first name"})
            }
            if(!lname){
                response.send({"message":"Please enter your last name"})
            }
            if(!email){
                response.send({"message":"Please enter your email"})
            }
            if(!password){
                response.send({"message":"Please enter your password"})
            }
            if(!cpassword){
                response.send({"message":"Please confirm your password"})
            }
            if(!dob){
                response.send({"message":"Please enter your Date of birth"})
            }
            if(!gender){
                response.send({"message":"Please mark your gender"})
            }
            if(!countery){
                response.send({"message":"Please select your last countery"})
            }

            // checking if the user is already in DB

            let userExists = await users.findOne({email})

            if(userExists){
                response.status(200).send({
                    success: true,
                    "message":"email already exists",
                })
            }
            else{

            // hashing password

           const hashedPassword = await hashPassword(password)

           let user = await users({fname,lname, email, password: hashedPassword, cpassword: hashedPassword, dob, gender, countery}).save()

           response.status(201).send({

            success: true,
            "message": "User Registerd Successfuly",
            user
           })

        }
    }
        catch(error){

            console.log(error)

            response.status(500).send({
                
                success: false,
                "message": "Error in Registration",
                error
            })

        }
    }


    



    // login user authentiction

    export const loginUser = async (request,response) =>{

        try {

            const {email,password} = request.body



            // if any property/field is missing

            
            if(!email || !password){

                throw new Error('Email or Password is Invalid or Missing');
            }
            
            // finding weather the user is in DataBase or not

            let user = await users.findOne({email})

            // if user is not in dataBase
            if(!user){
                throw new Error('No such record is available, please register first');

            }

            // if user is present then compare password

            let check = await comparePassword(password, user.password)

            // if password dosent matched

            if(!check){

                throw new Error('invalid password');

            }

            // token generation when password is matched

            const token = await JWT.sign({_id: user._id}, process.env.JWT_KEY, {expiresIn:"1d"})
     
            // minutes main expiry nhi rkh skty .




            response.status(200).send({
                success: true,
                "message":"Loged in successfuly",
                user: {

                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    // password: user.password,
                    // dob: user.dob,
                    // gender: user.gender,
                    // countery: user.countery,
                    token
                },
            })
        } catch (error) {
            
            console.log(error)

             
            return response.status(500).send({
                
                success: false,
                message: error.message, // Use the error message from the thrown error

            })
        }

    }


    //  response if admin

    export const yesAdmin = (request,response) =>{

        response.status(200).send({
                
            success: true,
            "message":"you are admin",
  
        })
    }


// getting data from mongodb
export const getForm= async (request, response) => {

    let result = await users.find()
    response.send(result)
 }


// deleting data in mongoDB
export const deleteForm = async (request, response) => {


    const id = request.params.id

    const check = await users.findByIdAndDelete(id)

}


// getting single user on the basis of id from mongodb
   export const find_user_id = async (request, response) => {

    let result = await users.findOne({ _id: request.params.id })
    response.send(result)
}






// updating data on the basis of id on client and server server side 
export const updateForm = async (request, response) => {
    try {
        const userId = request.params.id;
        const updates = request.body;

        // Check if the user is providing a new password
        if (updates.password) {
            // Hash the new password
            const hashedPassword = await hashPassword(updates.password);
            updates.password = hashedPassword;
            updates.cpassword = hashedPassword;
        }

        // Update the user's data
        const updatedUser = await users.findByIdAndUpdate(userId, updates, {
            new: true, // Return the updated user
        });

        response.status(200).send({
            success: true,
            "message" : "User updated successfully",
            user: updatedUser,
        });
        
    } catch (error) {
        console.error(error);
        response.status(500).send({
            success: false,
            message: "Error in updating user",
            error: error.message,
        });
    }
};




// searching data on the baasis of key
    export const SearchUsers = async (request, response) => {

    let result = await users.find({

        "$or": [
            {
                fname : {$regex: request.params.key }

            },
            {
                lname : {$regex: request.params.key }

            },
            {
                email : {$regex: request.params.key }

            },
            {
                dob : {$regex: request.params.key }

            },

        ]
    })

    response.send(result);
}


// ({email})       =======  ({email:email})
