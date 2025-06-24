import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div>
      <h1>FitBok</h1>
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
