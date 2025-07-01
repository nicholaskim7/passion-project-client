import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://passion-project-server.onrender.com/api/auth/me', { // route that will check if user is logged in
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then(data => {
        console.log("Auth data:", data);
        if (data.user) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // go back to login using google auth
    return <Navigate to="/login" replace />;
  }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export default ProtectedRoute;
