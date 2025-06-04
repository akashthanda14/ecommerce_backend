const authService = require('../services/authService.js');


async function signUp(req,res) {
    try{
        const {name , email , password} = req.body;
        const result = await authService.signUp({name , email , password});
        res.status(201).json(result);

    }catch(error){
        res.status(400).json({error:error.message});
    }
    
}

async function signIn(req,res) {

    try{
        const {email,password} = req.body;
        const result = await authService.signIn({email,password});
        res.status(200).json(result);
    }catch(error){
        res.status(401).json({error:error.message});
    }
    
}

module.exports = {
    signUp,
    signIn
}