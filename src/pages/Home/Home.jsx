import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../components/UserContext/UserContext';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../../components/Search/Search';


function Home() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  console.log("User in Home:", user);
  const [datesWorkedOut, setDatesWorkedOut] = useState(0);
  const [error, setError] = useState(null);
  const [serchedUser, setSearchedUser] = useState('');
  //Get user’s timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect (() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch('https://passion-project-server.onrender.com/api/fetch-user-activity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Send users timezone to backend
          body: JSON.stringify({ timeZone }),
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

  const handleSearch = (search) => { // search value is passed from Search.jsx
    setSearchedUser(search); //update with whatever user name is searched

    // if searched something
    if (search.trim() !== '') {
      navigate(`profile/${search}`);
    }
  };
  
  return (
    <div className='home-container'>
      {/* search for user name */}
      <Search onSearch={handleSearch}/>
      <h1 className='title'>SeungFit</h1>
      <img
        src={user?.avatar_path || '/default-avatar.png'}
        alt='Profile Avatar'
        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '1px solid yellowgreen', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}
      />
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
