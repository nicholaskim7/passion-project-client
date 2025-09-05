import React, { useEffect } from 'react';
import './Login.css';

function Login() {
  const handleGoogleLogin = () => {
    window.location.href = 'https://passion-project-server.onrender.com/api/auth/google';
  };

  return (
    <div className='login-container'>
      <h1>Welcome to <span className='text'>SeungFit</span></h1>
      <p>Please sign in to continue.</p>
      <button className='google-btn' onClick={handleGoogleLogin}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
          alt="Google logo" 
        />
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
