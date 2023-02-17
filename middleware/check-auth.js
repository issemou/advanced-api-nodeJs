const models = require('../models');
const validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


function checkAuth(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'secret');
        req.userData = decodedToken;
        next();
    }catch (e) {
        return res.status(401).json({
            "message": "Invalid or Expired Token provided !",
            "error": e
        });
    }
}

module.exports={
    checkAuth:checkAuth,
}