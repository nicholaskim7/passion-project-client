// The new Login.jsx
import React from 'react';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    // This is the token Google gives us after a successful login.
    const token = credentialResponse.credential;

    try {
      // Send this token to our new backend endpoint for verification
      const response = await fetch('https://passion-project-server.onrender.com/api/auth/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        // If the backend successfully creates a session, navigate to the home page.
        navigate('/');
      } else {
        console.error('Backend login failed.');
        alert('An error occurred during login. Please try again.');
      }
    } catch (error) {
        console.error('Error sending token to backend:', error);
        alert('An error occurred during login. Please try again.');
    }
  };

  const handleLoginError = () => {
    console.log('Login Failed');
    alert('Google login failed. Please try again.');
  };

  return (
    <div className='login-container'>
      <h1>Welcome to <span className='text'>SeungFit</span></h1>
      <p>Please sign in to continue.</p>
      {/* This component handles the secure pop-up flow */}
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        useOneTap
      />
    </div>
  );
}

export default Login;
