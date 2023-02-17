const express = require('express');
const router = express.Router();
const postController  = require('../controllers/postController');
const checkAuthMiddleware = require('../middleware/check-auth');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("Hello world");
});

/*get blog-actions*/
router.get('/blog/posts', checkAuthMiddleware.checkAuth, postController.getAllPost);
router.post('/blog/add-post',checkAuthMiddleware.checkAuth ,postController.save);
router.get('/blog/description/:id',checkAuthMiddleware.checkAuth ,postController.show)
router.patch('/blog/posts/:id',checkAuthMiddleware.checkAuth ,postController.update)
router.delete('/blog/posts/:id',checkAuthMiddleware.checkAuth ,postController.destroy)


module.exports = router;
