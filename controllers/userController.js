const models = require('../models');
const validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


function signUp(req, res){

    models.User.findOne({where:{email:req.body.email}}).then(result=>{
        if(result){
            res.status(409).json({
               message: "Email already Existe"
            });
        }else {
            bcryptjs.genSalt(10, function(err, salt){

                bcryptjs.hash( req.body.password, salt, function(error, hash){
                    const user ={
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }

                    models.User.create(user).then(
                        result =>{
                            res.status(200).json({
                                message: "User created succes",
                                user: result
                            });
                        }
                    ).catch(error=>{
                        res.status(500).json({
                            message: "Somthing went Wrong",
                            error: error
                        });
                    });
                });
            })
        }
    }).catch(error=>{
        res.status(500).json({
            message: "Somthing went Wrong",
            error: error
        });
    })
}



function login(req, res){

    models.User.findOne(

        {where:{email: req.body.email}}
    ).then(
        user=>{

            if(user == null){
                res.status(401).json({
                    message:"User Doesn't exist"
                });
            }else {
                bcryptjs.compare(req.body.password, user.password, function (err, result) {

                    if ( result ){
                        const token = jwt.sign({
                            email: user.email,
                            userId: user.id
                        }, 'secret', function(error, token){
                            res.status(200).json({
                                message: " Authentication successful",
                                token: token
                            });
                        });
                    }else {
                        res.status(401).json({
                            message:"Invalid credential"
                        });
                    }
                })
            }

        }
    ).catch(
        error=>{
            res.status(500).json({
                message: "Somthing went Wrong",
                error: error
            });
        }
    );
}

module.exports ={
    signUp:signUp,
    login:login
}