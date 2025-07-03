import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../components/UserContext/UserContext';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const user = useContext(UserContext);
  console.log("User in Home:", user);
  const [datesWorkedOut, setDatesWorkedOut] = useState(0);
  const [error, setError] = useState(null);

  useEffect (() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch('https://passion-project-server.onrender.com/api/fetch-user-activity', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        // extract count of days worked out this week
        setDatesWorkedOut(jsonData.daysWorkedOut);
      } catch (error) {
        setError(error);
      }
    }
    fetchActivity();
  }, []);
  
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
      <h3>Workout streak this week: <span style={{ color: 'yellowgreen', fontWeight: 'bold'}}>{datesWorkedOut}</span></h3>
    </div>
  )
}

export default Home
