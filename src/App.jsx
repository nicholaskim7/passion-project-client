import { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LogWorkout from "./pages/LogWorkout/LogWorkout";
import Home from "./pages/Home/Home";
import History from "./pages/History/History";


function App() {

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits);
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/logworkout" element={<LogWorkout />} />
          <Route path='/history' element={<History />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
