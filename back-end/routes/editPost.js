const express = require('express')
const router = express.Router()

const {updatePostData} = require('../controllers/postController')

router.put('/:id', updatePostData);

module.exports = router