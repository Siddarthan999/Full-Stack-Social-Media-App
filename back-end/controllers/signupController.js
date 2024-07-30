const {request, response} = require('express')
const userData = require('../data/userData')
const userModel = require('../models/userModel')
const {hashPassword, comparePassword } = require('../helpers/auth')

const addNewUser = async(request, response) => {
    const newUser = request.body
    try{
        let users = await userModel.find()
        if(users.length === 0)
        {
            const initialUser = await userModel.insertMany(userData);
        }
        const existingEmail = await userModel.findOne({email: newUser.email})
        const existingUserName = await userModel.findOne({userName: newUser.userName})
        if(existingEmail)
        {
            return response.status(409).json({message: `A user with ${newUser.email} already exists`})
        }
        if(existingUserName)
        {
            return response.status(409).json({message: `A user with ${newUser.userName} already exists`})
        }
        // BCRYPT
        const hashedPassword = await hashPassword(newUser.password);
        newUser.password = hashedPassword;
        
        const insertedUser = await userModel.create(newUser)
        response.status(201).json({message : 'Registration Successful', user : insertedUser})
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

module.exports = addNewUser