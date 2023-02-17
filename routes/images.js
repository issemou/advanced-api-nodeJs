const express = require('express');
const router = express.Router();
const imageController  = require('../controllers/image.controller');
const imageUploader = require('../helpers/images-uploader');
const checkAuth = require('../middleware/check-auth');

/*  image listing. */
router.post('/upload-image',
    checkAuth.checkAuth,
    imageUploader.upload.single('image'),
    imageController.upload);

module.exports = router;