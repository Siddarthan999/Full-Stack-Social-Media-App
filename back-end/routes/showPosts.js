const express = require('express')
const router = express.Router()

const {getAllPostData} = require('../controllers/postController')

router.get('/', getAllPostData);

module.exports = router