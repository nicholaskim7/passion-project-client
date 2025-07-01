import React, { useEffect } from 'react';

function Login() {
  useEffect(() => {
    const popup = window.open(
      'https://passion-project-server.onrender.com/api/auth/google',
      '_blank',
      'width=500,height=600'
    );

    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);

        // fetch user info
        fetch('https://passion-project-server.onrender.com/api/auth/me', {
          credentials: 'include',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.user) {
              console.log('User logged in:', data.user);
              window.location.href = '/';
            } else {
              console.log('No user info returned');
            }
          });
      }
    }, 500);

    return () => clearInterval(checkPopup);
  }, []);

  return (
    <div>
      <p>Redirecting to Google login...</p>
    </div>
  );
}

export default Login;
