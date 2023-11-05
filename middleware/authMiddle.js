import JWT from 'jsonwebtoken'
import users from '../models/User.js'




export const requireSignIn = async (request,response,next) => {

try {
    
    const decode =  JWT.verify(request.headers.authorization , process.env.JWT_KEY);
    request.user = decode;
    next();
    
} catch (error) {

    console.log(error)
    response.status(401).send({
        success: false,
        "massege":"Unauthorized",
        error
    })
    
}
}

// checing the role

export const isAdmin = async(request,response,next) =>{

    try {
        let user = await users.findById(request.user._id);
        if(user.role !==1){
            response.send("unauthorized or limited access")
        }else{
            next();
        }
    } catch (error) {

        console.log(error)
        response.status(500).send({
            success: false,
            "massege":"server error in data fetching",
            error
        })
        
    }
}

