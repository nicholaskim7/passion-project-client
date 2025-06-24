import { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LogWorkout from "./pages/LogWorkout/LogWorkout";
import Home from "./pages/Home/Home";
import History from "./pages/History/History";
import Prs from "./pages/Prs/Prs";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from './components/Menu/Menu';


function App() {
  return (
      <div>
        <BrowserRouter>
          <div className="app-container">
            <Menu />
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/logworkout" element={<LogWorkout />} />
              <Route path='/history' element={<History />} />
              <Route path='/your-prs' element={<Prs />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>

        </BrowserRouter>
      </div>
  )
}

export default App
