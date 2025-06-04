const userModel = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ||  'wvojnvqovqonqve';

async function signUp({name , email , password}) {
    //check if User Exist or not 
    const existingUser = await userModel.findUserByEmail(email);
    if(existingUser){
        throw new Error('User already Exist');
    }
    //Create New User 
    const user = await userModel.createUser(name,email,password);

    const token = jwt.sign({id:user.id , email : user.email} , JWT_SECRET_KEY , {expiresIn : '1d'});

    return {user,token};
    
}

async function signIn({email,password}) {
    const user = await userModel.findUserByEmail(email);
    if(!user){
        throw new Error('Invalid Email or Password');
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({id : user.id , email : user.email } , JWT_SECRET_KEY , {expiresIn:'1d'});

    //DO not send password back
    delete user.password;

    return {user,token};
    
}

module.exports = {
    signUp,
    signIn
}

