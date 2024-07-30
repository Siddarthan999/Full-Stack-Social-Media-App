const express = require('express')
const router = express.Router()

const {deletePostData} = require('../controllers/postController')

router.delete('/:id', deletePostData);

module.exports = router