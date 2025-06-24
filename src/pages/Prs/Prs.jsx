import React from 'react'
import '../History/History.css';
import { useState, useEffect } from 'react';

function Prs() {
  const [fetchedPrs, setFetchedPrs] = useState([]);
    const [error, setError] = useState(null); 
  
    useEffect(() => {
      const fetchPrs = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/fetch-prs");
          if (!response) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json(); 
          setFetchedPrs(jsonData);
        } catch (error) {
          setError(error);
        }
      };
      fetchPrs();
    }, []);
  
  
    return (
      <div>
        {/* display users prs only standardized lifts: bench, squat, and deadlift*/}
        {fetchedPrs.map((pr) => (
          <div key={pr.key}>
            <h3>{pr.name}</h3>
            <p>{pr.weight} lbs x {pr.reps} reps</p>
            <p>Date: {new Date(pr.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    )
  }

export default Prs
