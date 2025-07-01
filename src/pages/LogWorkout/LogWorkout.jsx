import React, { useState } from 'react'
import Dropdown from '../../components/Dropdown/MyDropdown.jsx';
import "./LogWorkout.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaPlus, FaMinus, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';

function LogWorkout() {
  const [selectedOption, setSelectedOption] = useState(null); // Chest day, Back day, Leg day
  //const [selectedItems, setSelectedItems] = useState([]);
  const [liftData, setLiftData] = useState({});
  const [cardioData, setCardioData] = useState({});

  const workoutExercises = {
    "Chest day": [
      "Bench Press",
      "Incline Bench Press",
      "Incline Dumbbell Bench Press",
      "Chest Flys",
      "Tricep Pushdowns",
      "Tricep Pulldowns",
      "Shoulder Press",
      "Lat Raises",
      "Face Pulls",
      "Rear delt flys",
    ],
    "Back day": [
      "Chest Supported Seated Row",
      "Cable Row",
      "Barbell Row",
      "Lat Pulldowns",
      "Rear delt flys",
      "Face Pulls",
      "Dumbbell Bicep Curls",
      "Cable Bicep Curls",
    ],
    "Leg day": [
      "Barbell Squat",
      "Hack Squat",
      "Leg Press",
      "Leg Extensions",
      "Hamstring Curls",
      "RDL",
      "Deadlift",
    ],
    "Cardio day": [
      "Treadmill Run",
      "Treadmill Incline Walk",
      "Stairmaster",
      "Walking Outdoors",
      "Running Outdoors",
      "Jump Rope",
      "Rowing Machine",
      "Stationary Bike",
      "Outdoors Bike",
      "Swimming",
    ],
  };

  const handleDropdownSelect = (option) => { // event key of selected workout day is passed from dropdown.jsx
    setSelectedOption(option); //update with whatever workout day is selected
    setLiftData({}); // clear all selected exercises everytime we change workout day.
    setCardioData({});
  };

  const handleSelectLift = (exercise) => {
    setLiftData(prev => {
      if (exercise in prev) { // dont need to add again if exercise has already been selected
        const newData = {...prev };
        delete newData[exercise];
        return newData;
      }
      else {
        return {
          ...prev,
          [exercise]: [{ reps: "", weight: "" }] // each exercise set maps to its own reps and weight 
        };
      }
    });
  };

  const handleSelectCardio = (exercise) => {
    setCardioData(prev => {
      if (exercise in prev) { // dont need to add again if exercise has already been selected
        const newData = {...prev };
        delete newData[exercise];
        return newData;
      }
      else {
        return {
          ...prev,
          [exercise]: { duration: "", caloriesBurned: "" } // each exercise maps to its own duration and calories burned 
        };
      }
    });
  };


  const handleAddSet = (exercise) => {
    setLiftData(prev => ({
      ...prev,
      [exercise]: [...prev[exercise], { reps: "", weight: "" }] // add another instance of the exercise set
    }));
  };

  const handleDeleteSet = (exercise) => {
    setLiftData(prev => {
      const currentSets = prev[exercise];

      if (currentSets.length <= 1) return prev; // prevent deleting last set
      
      return {
        ...prev,
        [exercise]: currentSets.slice(0, -1) // remove last set
      };
    });
  };



  const handleLiftChange = (exercise, index, field, value) => {
    setLiftData(prev => {
      const updatedSets = prev[exercise].map((set, i) =>
        i == index ? { ...set, [field]: value } : set
      );
      return { ...prev, [exercise]: updatedSets };
    })
  };


  const handleChangeCardio = (exercise, field, value) => {
    setCardioData(prev => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        [field]: value
      }
    }));
  };

  const getButtonStyle = (exercise) => ({
    backgroundColor: (exercise in liftData || exercise in cardioData) ? 'yellowgreen' : ' #1a1a1a',
    border: '1px solid black',
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
  });

  const handleLiftSubmit = (e) => {
    e.preventDefault();
    // prevent submitting when sets and or reps are left blank
    for (const [exercise, sets] of Object.entries(liftData)) { // traverse exercises
      for (let i = 0; i < sets.length; i++) { // traverse number of sets selected for each exercise
        const { reps, weight } = sets[i] // extract reps and weight for each set
        if (!reps || !weight || parseInt(reps) < 1 || parseFloat(weight) < 1) { // make sure it is not left blank
          toast.error(`Please fill in all reps and weight`) // notify user to fill in the blank
          return
        }
      }
    }
    // otherwise we are safe to log the workout
    fetch("https://passion-project-server.onrender.com/api/log-workout", {
      method: 'post',
      credentials: 'include',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(liftData)
    }).then(async response => {
        if (!response.ok) {
          if (response.status === 401) {
            toast.error("You must be logged in to log a strength workout");
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.error || "Unexpected error");
        }

        const data = await response.json();
        toast.success(data.message || "Strength Workout logged successfully");
        setLiftData({});
      })
      .catch(error => {
        console.error(error);
        toast.error(error.message || "There was an error logging your strength workout");
      });
  };


  const handleCardioSubmit = (e) => {
    e.preventDefault();

    for (const [exercise, entry] of Object.entries(cardioData)) {
      const { duration, caloriesBurned } = entry; //unpack duration and calories burned
      if (!duration || parseInt(duration) < 1) {
        toast.error(`Please enter duration for ${exercise}`);
        return;
      }
    }
    fetch("https://passion-project-server.onrender.com/api/log-cardio", {
      method: 'post',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cardioData)
    }).then(async response => {
        if (!response.ok) {
          if (response.status === 401) {
            toast.error("You must be logged in to log a cardio workout");
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.error || "Unexpected error");
        }

        const data = await response.json();
        toast.success(data.message || "Cardio Workout logged successfully");
        setCardioData({});
      })
      .catch(error => {
        console.error(error);
        toast.error(error.message || "There was an error logging your cardio workout");
      });
  };

  return (
    <div>
      <div>
        <Dropdown onSelect={handleDropdownSelect} />
        {selectedOption && (
          <div className='custom-container'>
            {workoutExercises[selectedOption]?.map((exercise) => ( // where we map each exercise as a button
              <button
                key={exercise}
                onClick={() => {
                  if (selectedOption === "Cardio day") {
                    handleSelectCardio(exercise)
                  } else {
                    handleSelectLift(exercise)
                  }
                }}
                style={getButtonStyle(exercise)} // apply the custom button styling
              >
                {exercise}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className='form-container'>
        {selectedOption === "Cardio day" ? ( 
          Object.keys(cardioData).length > 0 ? ( // selected cardio day see cardio form
          <Form onSubmit={handleCardioSubmit}>
            <ul className='exercise-list'>
              {Object.entries(cardioData).map(([exercise, entry]) => (
                <li key={exercise}>
                  <h5 className='mt-2 workout-name'>{exercise}</h5>
                  <Form.Group className='form-group-inline'>
                    <Form.Label>Duration (min)</Form.Label>
                    <Form.Control type="number" placeholder="Duration" value={entry.duration} onChange={(e) => handleChangeCardio(exercise, "duration", e.target.value)} min="1" className='form-input'/>
                    <Form.Label>Calories Burned</Form.Label>
                    <Form.Control type="number" placeholder="Calories" value={entry.caloriesBurned} onChange={(e) => handleChangeCardio(exercise, "caloriesBurned", e.target.value)} min="0"className='form-input'/>
                  </Form.Group>
                </li>
              ))}
            </ul>
            <button type='submit' className='save-button'>
              <FaSave />
            </button>
          </Form>
          ) : (
            <p>No exercises selected</p>
          )
        ) : Object.keys(liftData).length > 0 ? ( // selected a lift day see lift form
          <Form onSubmit={handleLiftSubmit}>
            {/* <h3>Selected Exercises:</h3> */}
            <ul className='exercise-list'>
              {Object.entries(liftData).map(([exercise, sets]) => (
                <li key={exercise}>
                  <h5 className='mt-2 workout-name'>{exercise}</h5>
                  {sets.map((set, index) => (
                    <Form.Group className='form-group-inline' key={index}>
                      <Form.Label>{`set ${index + 1}`}</Form.Label>
                      <Form.Control type="number" placeholder="# of reps" value={set.reps} onChange={(e) => handleLiftChange(exercise, index, 'reps', e.target.value)} min="1" className='form-input'/>
                      <Form.Control type="number" placeholder="weight" value={set.weight} onChange={(e) => handleLiftChange(exercise, index, 'weight', e.target.value)} min="1" className='form-input'/>
                    </Form.Group>
                  ))}
                  <FaPlus className="set-buttons" onClick={() => handleAddSet(exercise)}/>
                  <FaMinus className="set-buttons" onClick={() => handleDeleteSet(exercise)}/>
                </li>
              ))}
            </ul>
            <button type='submit' className='save-button'>
              <FaSave />
            </button>
          </Form>
        ) : (
          <p>No exercises selected</p>
        )}
      </div>
    </div>
  );
}

export default LogWorkout
