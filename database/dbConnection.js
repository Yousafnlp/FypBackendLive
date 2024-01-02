import colors from 'colors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'


// configetation of env
dotenv.config();

const dbConnection =  () => {

    try {
// mongose.connect("mongodb://localhost:27017/userProfile")
    mongoose.connect(process.env.live_db)
    console.log(`database connected successffuly` .bgGreen)
    } catch (err) {
    console.log("error in connection",err)
    }
}

export default dbConnection;



// CORS: cross origen resorce sharing...




// // mongoose.connect("mongodb://localhost:27017/userProfile")
// // .then(()=>{
// //     console.log("connecter successffuly")
// // }).catch(error=>{
// //     console.log("error in connection",error)
// // })