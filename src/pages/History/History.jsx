import React from 'react';
import './History.css';
import { useState, useEffect } from 'react';

function History() {
  const [fetchedWorkouts, setFetchedWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // initially fetch current weeks workouts
  useEffect(() => {
    const now = new Date();

    // start of the week
    const startOfWeek = new Date(now);

     // day of the month - day of the week = sunday of this week
    startOfWeek.setDate(now.getDate() - now.getDay());

    // rewind to beginning of the day
    startOfWeek.setHours(0, 0, 0, 0);

    // end of the week
    const endOfWeek = new Date(now);

     // day of the month + 6 - the current day of the week = saturday of this week
    endOfWeek.setDate(now.getDate() + (6 - now.getDay()));

     // very end of saturday
    endOfWeek.setHours(23, 59, 59, 999);

    setStartDate(startOfWeek);
    setEndDate(endOfWeek);
  }, []);


  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const params = new URLSearchParams();
        
        if (startDate && endDate) {
          // append params to backend api url
          params.append("start", startDate.toISOString());
          params.append("end", endDate.toISOString());
        }

        const response = await fetch(`http://localhost:8080/api/fetch-workouts?${params}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json(); 
        setFetchedWorkouts(jsonData);
      } catch (error) {
        setError(error);
      }
    };
    fetchWorkouts();
  }, [startDate, endDate]);


  return (
    // example format of fetched workout data

    //     [
    //   {
    //     "workoutId": 2,
    //     "date": "2025-06-23T22:32:53.000Z",
    //     "exercises": [
    //       {
    //         "name": "Incline Dumbbell Bench Press",
    //         "sets": [
    //           {
    //             "reps": 10,
    //             "weight": 45
    //           },
    //           {
    //             "reps": 10,
    //             "weight": 45
    //           },
    //           {
    //             "reps": 8,
    //             "weight": 55
    //           },
    //           {
    //             "reps": 5,
    //             "weight": 55
    //           }
    //         ]
    //       },
    //       {
    //         "name": "Tricep Pulldowns",
    //         "sets": [
    //           {
    //             "reps": 10,
    //             "weight": 25
    //           },
    //           {
    //             "reps": 10,
    //             "weight": 35
    //           },
    //           {
    //             "reps": 10,
    //             "weight": 55
    //           }
    //         ]
    //       },
    //       {
    //         "name": "Shoulder Press",
    //         "sets": [
    //           {
    //             "reps": 8,
    //             "weight": 35
    //           },
    //           {
    //             "reps": 8,
    //             "weight": 35
    //           },
    //           {
    //             "reps": 5,
    //             "weight": 35
    //           }
    //         ]
    //       }
    //     ]
    //   },
    // ]

    <div>
      <h2>Workout History</h2>
      {/* filter by date range */}
      <input type="date" onChange={e => {
          // set start day in local time
          const [year, month, day] = e.target.value.split('-').map(Number);
          const localStart = new Date(year, month - 1, day, 0, 0, 0, 0);
          setStartDate(localStart);
        }} 
      />
      <input type="date" onChange={e => {
        // set end date in local time
        const [year, month, day] = e.target.value.split('-').map(Number);
          const localEnd = new Date(year, month - 1, day, 23, 59, 59, 999)
          setEndDate(localEnd);
        }} 
      />
      <ul>
        <div className='custom-container'>
          {fetchedWorkouts.map((workout) => (
            //iterate workout sessions
            <li key={workout.workoutId}> 
              <h4>{new Date(workout.date).toLocaleDateString()}</h4>
              <ul>
                <div className='exercises-container'>
                  {workout.exercises.map((exercise, idx) => ( // each workout session has a list of exercises that were done
                    <li key={idx}>
                      <strong className='exercise-name'>{exercise.name}</strong>
                      {exercise.category === "Strength" ? (
                        <ul className='list-of-sets'>
                          {exercise.sets.map((set, setIdx) => ( // each exercise has its respective sets and reps
                            <li key={setIdx}>
                              Set {setIdx + 1}: Reps: {set.reps}, Weight: {set.weight} lbs
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <li className='list-of-sets'>
                          Duration (min): {exercise.cardio?.duration_minutes}, Calories burned: {exercise.cardio?.calories_burned}
                        </li>
                      )}
                    </li>
                  ))}
                </div>
              </ul>
            </li>
          ))}
        </div>
      </ul>
    </div>
  )
}

export default History
