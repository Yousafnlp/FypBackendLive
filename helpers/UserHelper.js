import  bcrypt from "bcrypt"


// hasing your plain password
export const hashPassword = async (password) =>{

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password,saltRounds)
    return hashedPassword
}

// comparing hashed password with plain passwod;

export const comparePassword = async (password, hashedPassword)=>{

    return await bcrypt.compare(password,hashedPassword)
}




/**
 * it handles two function 
 * one function will convert your plain password to hashed password
 * 
 * second function will compare the password with hashed password at the time of login
 * 
 *  */ 