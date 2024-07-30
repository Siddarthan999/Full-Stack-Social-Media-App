import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import toast from 'react-hot-toast';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3500/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching all post datas:', error);
        toast.error('Error fetching all posts');
      });
  }, []);

  const toggleDropdown = (index) => {
    document.getElementById(`dropdown-${index}`).classList.toggle('show');
  };

  const deletePost = (id) => {
    axios.delete(`http://localhost:3500/posts/deletepost/${id}`)
      .then(response => {
        toast.success('Deleted Successfully');
        setPosts(posts.filter(post => post._id !== id));
      })
      .catch(error => {
        console.error('Error fetching all post datas:', error);
        toast.error('Error deleting post');
      });
  };

  return (
    <React.Fragment>
      <div className='posts'>
        {posts.map((post, index) => (
          <div key={index} className='posts-card'>
            <div className='posts-details'>
              <div className="dropdown-container">
                <button className="dropdown-button" onClick={() => toggleDropdown(index)}>⋮</button>
                <div id={`dropdown-${index}`} className="dropdown-content">
                  <button onClick={() => navigate(`/editpost/${post._id}`)}>Edit</button>
                  <button onClick={() => deletePost(post._id)}>Delete</button>
                </div>
              </div>
              <h2 className='user-name'>{post.userName}</h2>
              <p className='content'>{post.content}</p>
              <p className='date'>{post.date}</p>
            </div>
          </div>
        ))}
      </div>
      <button className='plus-button'>
        <Link to="/newpost" className="nav-link">+</Link>
      </button>
    </React.Fragment>
  )
}
