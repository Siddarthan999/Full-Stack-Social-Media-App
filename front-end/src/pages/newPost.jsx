import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { UserContext } from '../components/UserContext';
import axios from 'axios';
import './newPost.css';

export default function NewPost() {
    const { globalUserName } = useContext(UserContext);
    const navigate = useNavigate();

    function addNewPost(event) {
        event.preventDefault();

        const currentDate = new Date();
        const formattedLocalDate = currentDate.toLocaleString();

        const contentValue = document.querySelector('.content').value;
        console.log(contentValue);
        console.log(globalUserName);
        console.log(formattedLocalDate);
        
        const newPost = {
            "content": contentValue,
            "userName": globalUserName,
            "date": formattedLocalDate
        };

        axios.post('http://localhost:3500/posts/newpost', newPost)
        .then(response => {
            if (response.data.message) {
                toast.success('Posted Successfully');
                navigate('/home');
            } else {
                toast.error(`Unexpected status code: ${response.status}`);
            }
        })
        .catch(error => {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                console.error('Error: No response received from server', error.request);
                toast.error('Error: No response received from server');
            } else {
                console.error('Error:', error.message);
                toast.error(`Error: ${error.message}`);
            }
        });
    }

    return (
        <React.Fragment>
            <form onSubmit={addNewPost}>
                <h2>NEW POST</h2>
                <textarea className='content' rows={4} placeholder='Type something here....'></textarea>
                <button type='submit' className='post-button'>Post</button>
            </form>
        </React.Fragment>
    );
}