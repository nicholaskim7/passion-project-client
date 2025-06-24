import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyDropdown.css';


function MyDropdown({ onSelect }) {
  const [title, setTitle] = useState("Select a workout");
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleSelect = (e) => {
    const selectedWorkout = e.target.getAttribute("data-key");
    setSelectedIcon(selectedWorkout);
    setTitle(selectedWorkout);
    if (onSelect) onSelect(selectedWorkout);
  };
  return (

    <div className='icon-container'>
      <img src='../icons/gym.png' data-key="Chest day" className={`icon ${selectedIcon === "Chest day" ? "selected" : ""}`} onClick={handleSelect}></img>
      <img src='../icons/back.png' data-key="Back day" className={`icon ${selectedIcon === "Back day" ? "selected" : ""}`} onClick={handleSelect}></img>
      <img src='../icons/front.png' data-key="Leg day" className={`icon ${selectedIcon === "Leg day" ? "selected" : ""}`} onClick={handleSelect}></img>
    </div>
  )
}

export default MyDropdown
