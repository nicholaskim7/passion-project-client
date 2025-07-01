import React, { useEffect } from 'react';

function Login() {
  useEffect(() => {
    window.location.href = 'https://passion-project-server.onrender.com/api/auth/google';
  }, []);

  return (
    <div>
      <p>Redirecting to Google login...</p>
    </div>
  );
}

export default Login;

