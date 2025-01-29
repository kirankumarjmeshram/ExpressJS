const jwt = require('jsonwebtoken');
const Blacklist = require('../models/Blacklist');

const authenticate = async (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1];
    if(!token) {
        return res.status(401).json({message: "UnAuthorized"});
    }   

    try{

    }catch(error) {
        
    }

}