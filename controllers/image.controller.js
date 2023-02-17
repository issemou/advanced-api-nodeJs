function upload(req, res){

    if(req.file.filename){
        res.status(201).json({
            message:"Image upload Successfuly",
            url : req.file.filename
        });
    }else{
        res.status(201).json({
            message:"Somthing went wrong !"
        });
    }
}

module.exports ={
    upload:upload
}