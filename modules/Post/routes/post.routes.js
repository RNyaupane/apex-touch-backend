const express = require('express');
const PostController = require('../controllers/post.controller');
const router = express.Router();


router.get('', PostController.posts);
router.post('/add', PostController.addPost);

module.exports = router;