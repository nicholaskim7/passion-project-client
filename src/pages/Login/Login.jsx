import React, { useEffect } from 'react';

function Login() {
  useEffect(() => {
    const handleMessage = async (event) => {
      const allowedOrigin = 'https://passion-project-client.vercel.app';
      if (event.origin !== allowedOrigin) return;

      if (event.data === 'trigger-fetch') {
        try {
          const res = await fetch('https://passion-project-server.onrender.com/api/auth/me', {
            credentials: 'include',
          });

          if (!res.ok) throw new Error('Failed to fetch user');

          const data = await res.json();
          console.log('User received from OAuth:', data.user);

          // Redirect or update app state here
          window.location.href = '/';
        } catch (err) {
          console.error('OAuth login failed:', err);
          window.location.href = '/login-failed';
        }
      }
    };

    window.addEventListener('message', handleMessage);

    const authWindow = window.open(
      'https://passion-project-server.onrender.com/api/auth/google',
      '_blank',
      'width=500,height=600'
    );

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div>
      <p>Redirecting to Google login...</p>
    </div>
  );
}

export default Login;
