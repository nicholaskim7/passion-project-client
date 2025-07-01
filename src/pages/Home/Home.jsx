import React, { useContext } from 'react'
import { UserContext } from '../../components/UserContext/UserContext';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const user = useContext(UserContext);
  console.log("User in Home:", user);
  
  return (
    <div>
      <h1 className='title'>SeungFit</h1>
      <h3>Hi, {user?.username || user?.name}</h3>
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
