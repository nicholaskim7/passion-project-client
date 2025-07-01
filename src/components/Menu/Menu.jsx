import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBars } from 'react-icons/fa';
import './Menu.css';

function Menu() {
  const handleLogout = async () => {
    try {
      await fetch('https://passion-project-server.onrender.com/api/logout', {
        method: 'GET',
        credentials: 'include'
      });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <div className="menu-container">
      <Dropdown>
        <Dropdown.Toggle as="button" className='dropdown-btn'>
          <FaBars />
        </Dropdown.Toggle>

        <Dropdown.Menu className='menu'>
          <Dropdown.Item href="/" className='item'>Home</Dropdown.Item>
          <Dropdown.Item href="/logworkout" className='item'>Log workout</Dropdown.Item>
          <Dropdown.Item href="/history" className='item'>Workout History</Dropdown.Item>
          <Dropdown.Item href="/your-prs" className='item'>Prs</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout} className='logout-button'>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Menu
