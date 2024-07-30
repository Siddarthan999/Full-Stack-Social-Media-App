import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { UserContext } from '../components/UserContext';
import axios from 'axios';

export default function EditPost() {
    const { globalUserName } = useContext(UserContext);
    const { id } = useParams();  // Get the post ID from the URL
    const navigate = useNavigate();
    const [content, setContent] = useState('');

    function updatePost(event) {
        event.preventDefault();

        const currentDate = new Date();
        const formattedLocalDate = currentDate.toLocaleString();

        const updatedPost = {
            "_id": id,
            "userName": globalUserName,
            "content": content,
            "date": formattedLocalDate
        };

        axios.put(`http://localhost:3500/posts/editpost/${id}`, updatedPost)
            .then(response => {
                if (response.data.message) {
                    toast.success('Updated Successfully');
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
            <form onSubmit={updatePost}>
                <h2>Edit POST</h2>
                <textarea
                    className='content'
                    rows={4}
                    placeholder='Type something here....'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type='submit' className='post-button'>Post</button>
            </form>
        </React.Fragment>
    );
}
