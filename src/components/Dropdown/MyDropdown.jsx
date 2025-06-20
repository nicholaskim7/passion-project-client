import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


function MyDropdown({ onSelect }) {
  const [title, setTitle] = useState("Select a workout");

  const handleSelect = (eventKey) => {
    setTitle(eventKey);
    if (onSelect) onSelect(eventKey);
  };
  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle as="button">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Chest day">Chest day</Dropdown.Item>
        <Dropdown.Item eventKey="Back day">Back day</Dropdown.Item>
        <Dropdown.Item eventKey="Leg day">Leg day</Dropdown.Item>
        <Dropdown.Item eventKey="Cardio">Cardio</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default MyDropdown
