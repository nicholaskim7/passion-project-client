import React from 'react';
import './Login.css';

function Login() {
  const handleLogin = () => {
    const popup = window.open(
      'https://passion-project-server.onrender.com/api/auth/google',
      '_blank',
      'width=500,height=600'
    );

    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);

        // after popup closes, fetch session info
        fetch('https://passion-project-server.onrender.com/api/auth/me', {
          credentials: 'include',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.user) {
              console.log('User:', data.user);
              window.location.href = '/';
            } else {
              console.log('Login failed or canceled.');
            }
          });
      }
    }, 500);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {/* dont open popup immediately only by user interaction */}
      <button className="button" onClick={handleLogin} >
        Log In with Google
      </button>
    </div>
  );
}

export default Login;
