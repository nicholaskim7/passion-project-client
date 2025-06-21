import React, { useState } from 'react'
import Dropdown from '../../components/Dropdown/MyDropdown.jsx';
import "./LogWorkout.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaPlus, FaMinus, FaSave } from 'react-icons/fa';

function LogWorkout() {
  const [selectedOption, setSelectedOption] = useState(null); // Chest day, Back day, Leg day
  //const [selectedItems, setSelectedItems] = useState([]);
  const [exerciseData, setExerciseData] = useState({});

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
  };

  const handleDropdownSelect = (option) => { // event key of selected workout day is passed from dropdown.jsx
    setSelectedOption(option); //update with whatever workout day is selected
    setExerciseData({}); // clear all selected exercises everytime we change workout day.
  };

  const handleSelect = (exercise) => {
    setExerciseData(prev => {
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

  const handleAddSet = (exercise) => {
    setExerciseData(prev => ({
      ...prev,
      [exercise]: [...prev[exercise], { reps: "", weight: "" }] // add another instance of the exercise set
    }));
  };

  const handleDeleteSet = (exercise) => {
    setExerciseData(prev => {
      const currentSets = prev[exercise];

      if (currentSets.length <= 1) return prev; // prevent deleating last set
      
      return {
        ...prev,
        [exercise]: currentSets.slice(0, -1) // remove last set
      };
    });
  };



  const handleChange = (exercise, index, field, value) => {
    setExerciseData(prev => {
      const updatedSets = prev[exercise].map((set, i) =>
        i == index ? { ...set, [field]: value } : set
      );
      return { ...prev, [exercise]: updatedSets };
    })
  }

  const getButtonStyle = (exercise) => ({
    backgroundColor: exercise in exerciseData ? 'yellowgreen' : ' #1a1a1a',
    border: '1px solid black',
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted:', exerciseData);
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
                onClick={() => handleSelect(exercise)}
                style={getButtonStyle(exercise)} // apply the custom button styling
              >
                {exercise}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className='form-container'>
        {Object.keys(exerciseData).length > 0 ? (
          <Form onSubmit={handleSubmit}>
            {/* <h3>Selected Exercises:</h3> */}
            <ul className='exercise-list'>
              {Object.entries(exerciseData).map(([exercise, sets]) => (
                <li key={exercise}>
                  <h5 className='mt-2 workout-name'>{exercise}</h5>
                  {sets.map((set, index) => (
                    <Form.Group className='form-group-inline' key={index}>
                      <Form.Label>{`set ${index + 1}`}</Form.Label>
                      <Form.Control type="number" placeholder="# of reps" value={set.reps} onChange={(e) => handleChange(exercise, index, 'reps', e.target.value)} min="0" className='form-input'/>
                      <Form.Control type="number" placeholder="weight" value={set.weight} onChange={(e) => handleChange(exercise, index, 'weight', e.target.value)} min="0" className='form-input'/>
                    </Form.Group>
                  ))}
                  <FaPlus className="set-buttons" onClick={() => handleAddSet(exercise)}/>
                  <FaMinus className="set-buttons" onClick={() => handleDeleteSet(exercise)}/>
                </li>
              ))}
            </ul>
            <FaSave type='submit' className='set-buttons'/>
          </Form>
        ) : (
          <p>No exercises selected</p>
        )}
      </div>
    </div>
  );
}

export default LogWorkout
