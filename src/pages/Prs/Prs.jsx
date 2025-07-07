import React from 'react'
//import '../History/History.css';
import { useState, useEffect } from 'react';
import './Prs.css';

function Prs() {
  const [fetchedStrengthPrs, setFetchedStrengthPrs] = useState([]);
  const [fetchedCardioPrs, setFetchedCardioPrs] = useState([]);
  const [strengthError, setStrengthError] = useState(null);
  const [cardioError, setCardioError] = useState(null);
  
    useEffect(() => {
      // parallel fetching
      Promise.all([
        fetch("https://passion-project-server.onrender.com/api/fetch-prs", {credentials: 'include',}),
        fetch("https://passion-project-server.onrender.com/api/fetch-cardio-prs", {credentials: 'include',})
      ])
      .then(async ([strengthRes, cardioRes]) => {
        if (!strengthRes.ok || !cardioRes.ok) throw new Error("One or more pr fetches failed");
        const [strengthData, cardioData] = await Promise.all([strengthRes.json(), cardioRes.json()]);
        setFetchedStrengthPrs(strengthData);
        setFetchedCardioPrs(cardioData);
      })
      .catch((error) => {
        setStrengthError(error);
        setCardioError(error);
      });
    }, []);
  
  
    return (
      <div className='prs-section'>
        {/* display users prs only standardized lifts: bench, squat, and deadlift*/}
        <div className='strength'>
          <h3>Your Strength Prs</h3>
          {fetchedStrengthPrs.length > 0 ? (
            fetchedStrengthPrs.map((pr) => (
              <div key={pr.key} className='box'>
                <h3 className='exercise-name'>{pr.name}</h3>
                <p>{pr.weight} lbs x {pr.reps} reps</p>
                <p>Date: {new Date(pr.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No strength prs yet</p>
          )
                }
        </div>
        
        {/* display cardio prs running, biking, swimming, stairmaster */}
        <div className='cardio'>
          <h3>Your Cardio Prs</h3>
          {fetchedCardioPrs.length > 0 ? (
            fetchedCardioPrs.map((cardio) => (
              <div key={cardio.key} className='box'>
                <h3 className='exercise-name'>{cardio.name}</h3>
                  <p>{cardio.duration} minutes x {cardio.calories} calories burned</p>
                  <p>Date: {new Date(cardio.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No cardio prs yet</p>
          )
          }
        </div>
      </div>
    )
  }

export default Prs
