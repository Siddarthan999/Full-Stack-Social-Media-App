require('dotenv').config();
const express = require('express');
const  cookieParser = require('cookie-parser');
const app = express()
const PORT  = process.env.PORT;

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

const mongoose = require('mongoose')

// Use CORS middleware
const cors = require('cors');
app.use(cors());

app.get('/', (request, response) => {
    response.status(200).json({message:'Hello World!'});
})

const loginRoute = require('./routes/loginRoute')
app.use('/login', loginRoute)

const signupRoute = require('./routes/signupRoute')
app.use('/signup', signupRoute)

const showPosts = require('./routes/showPosts')
app.use('/posts',showPosts)

const newPost = require('./routes/newPost')
app.use('/posts/newpost',newPost);

const editPost = require('./routes/editPost')
app.use('/posts/editpost', editPost);

const deletePost = require('./routes/deletePost')
app.use('/posts/deletepost', deletePost);

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.once('open', () => console.log(`Connected to database successfully`))
db.on('error', (errorMessage) => console.log(errorMessage))


app.listen(PORT, () => {
    console.log(`Server started running at http://localhost:${PORT}/`);
})