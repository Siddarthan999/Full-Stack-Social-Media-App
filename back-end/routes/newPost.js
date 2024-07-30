const express = require('express')
const router = express.Router()

const {newPostData} = require('../controllers/postController')

router.post('/', newPostData);

module.exports = router