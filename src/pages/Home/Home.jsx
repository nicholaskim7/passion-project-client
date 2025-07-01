import React, { useContext } from 'react'
import { UserContext } from '../../components/UserContext/UserContext';
import './Home.css';
import { Link } from 'react-router-dom';

function Home({ user }) {
  const user = useContext(UserContext);
  console.log("User in Home:", user);
  
  return (
    <div>
      <h1>SeungFit</h1>
      <h1>Welcome, {user?.displayName || user?.name}!</h1>
        <div className="card">
          <Link to="/logworkout">
            <button className="button">Log Workout</button>
          </Link>
          <Link to="/history">
            <button className="button">Workout History</button>
          </Link>
          <Link to="/your-prs">
            <button className="button">Your Prs</button>
          </Link>
        </div>
    </div>
  )
}

export default Home
