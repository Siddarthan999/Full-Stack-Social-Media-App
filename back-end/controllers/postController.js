const {request, response} = require('express')
const postsData = require('../data/postsData')
const postModel = require('../models/postModel');

const newPostData = async(request, response) => {
    const newPost = request.body;
    try {
        const insertedPost = await postModel.create(newPost);
        response.status(201).json({message: "Successfully Posted"})
    }
    catch(error)
    {
        response.status(500).json({message : error.message})
    }
}

const getAllPostData = async(request, response) => {
    try {
        let posts = await postModel.find();
        if(posts.length === 0)
        {
            const initialPosts = await postModel.insertMany(postsData);
            posts = await postModel.find();
        }
        response.status(200).json(posts);
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const updatePostData = async(request, response) => {
    const postTobeUpdated = request.body;
    try{
        const updatedPost = await postModel.findByIdAndUpdate({_id : postTobeUpdated._id}, postTobeUpdated, {new : true});
        if(updatedPost)
        {
            return response.status(200).json({message: 'SUCCESSFULLY UPDATED.', updatedPost})
        }
        else {
            return response.status(404).json({message: 'Invalid ID'});
        }
    }
    catch(error)
    {
        return response.status(500).json({message: error.message});
    }
}

const deletePostData = async(request, response) => {
    const id = request.params.id;
    try{
        const deletedPost = await postModel.findOneAndDelete({_id : id});
        if(deletedPost) {
            let posts = await postModel.find();
            response.status(200).json(posts);
            //return response.status(200).json({message: 'SUCCESSFULLY DELETED.'});
        }
        else {
            return response.status(400).json({message: 'Invalid ID'});
        }
    }
    catch(error)
    {
        return response.status(500).json({message: error.message});
    }
}

module.exports = {newPostData, getAllPostData, updatePostData, deletePostData}