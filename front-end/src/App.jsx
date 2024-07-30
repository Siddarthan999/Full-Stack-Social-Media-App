import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Login from './pages/login';
import SignUp from './pages/signup';
import Home from './pages/home';
import NewPost from './pages/newPost';
import EditPost from './pages/editPost';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <UserProvider>
      <React.Fragment>
        <Router>
          <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path='/' element={<Navigate to="/login" />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/home' element={<Home />} />
            <Route path='/newpost' element={<NewPost />} />
            <Route path='/editpost/:id' element={<EditPost />} /> {/* Updated Route */}
          </Routes>
        </Router>
      </React.Fragment>
    </UserProvider>
  );
}

export default App;
