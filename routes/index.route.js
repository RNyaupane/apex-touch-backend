const express = require('express');
const router = express.Router();
const authRouter = require('../modules/Auth/routes/auth.route');
const postRoute = require('../modules/Post/routes/post.routes');


router.use('/auth', authRouter);
router.use('/post', postRoute)

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;
