const models = require('../models');
const validator = require('fastest-validator');


function save(req, res){

    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryid: req.body.category_id,
        userId: req.userData.userId
    }

    const schema = {
        title:{type:"string", optional: false, max:"100"},
        content:{type: "string", optional: false, max:"500"},
        categoryId: {type:"number", optional:false}
    }

    const v = new validator();
    const validationResponse = v.validate(post, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message:"Validation failed",
            error : validationResponse
        });
    }



}

models.Category.findByPk(req.body.category_id).then(
    result =>{
        if(result !== null){
            models.Post.create(post).then(
                result=>{
                    res.status(200).json({
                        message: "Post created succes",
                        post: result
                    });
                }
            ).catch(error =>{
                res.status(500).json({
                    message: "Somthing went Wrong",
                    error: error
                });
            });
        }else {
            res.status(400).json({
                message: "Invalide Category ID",
            });
        }
    }
);

function show(req, res){
    const id = req.params.id;

    models.Post.findByPk(id).then(
        result=>{
            if(result){
                res.status(200).json(
                    {
                        message: "Success",
                        data :result
                    })  ;
            }else{

                res.status(404).json({
                    message: "Post not found!",
                });
            }
     }
    ).catch(error=>{

        res.status(500).json({
            message: "Somthing went wrong",
        });
    })
}

function getAllPost(req, res){
    models.Post.findAll().then(
        result =>{
            res.status(200).json({
                message: " Succes",
                data:result
            })
        }
    ).catch(error=>{
        res.status(500).json({
            message: "Somthing went wrong"
        })
    })
}

function update(req, res){
    const id = req.params.id;
    const userId = req.userData.userId;

    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageURL: req.body.image_url,
        categoryId: req.body.category_id,
    }

    models.Category.findByPk(id).then(
        result =>{
            if(result !== null){
                models.Post.update(updatedPost, {where:{id:id, userId:userId}}).then(
                    result=>{
                        res.status(200).json({
                            message:"updated success",
                            post: updatedPost
                        })
                    }
                ).catch(error=>{
                    res.status(500).json({
                        message: "Something went Wrong",
                        error:error
                    })
                })
            }else {
                res.status(400).json({
                    message: "Invalide Category ID",
                });
            }
        }
    );

    const schema = {
        title:{type:"string", optional: false, max:"100"},
        content:{type: "string", optional: false, max:"500"},
        categoryId: {type:"number", optional:false}

    }

    const v = new validator();
    const validationResponse = v.validate(updatedPost, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message:"Validation failed",
            error : validationResponse
        });
    }


}

function destroy(req, res){
    const id = req.params.id;
    const userId = req.userData.userId;

    models.Post.destroy({where:{id:id, userId:userId}}).then(
        result =>{
            res.status(200).json({
                message:"delete success",
                post: result
            })
        }
    ).catch(error=>{
        res.status(500).json({
            message: "Something went Wrong",
            error:error
        });
    });
}

module.exports = {
    save:save,
    show:show,
    getAllPost: getAllPost,
    update:update,
    destroy:destroy
}