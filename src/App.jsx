import { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LogWorkout from "./pages/LogWorkout/LogWorkout";
import Home from "./pages/Home/Home";
import History from "./pages/History/History";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/logworkout" element={<LogWorkout />} />
            <Route path='/history' element={<History />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
  )
}

export default App
