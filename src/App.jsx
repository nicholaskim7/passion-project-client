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
import Login from "./pages/Login/Login";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import RainAnimation from './components/RainAnimation/RainAnimation';


function App() {
  return (
      <div>
        <BrowserRouter>
          <div className="app-container">
            <Menu />
            <RainAnimation />
            <Routes>

              <Route path="/" element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }/>

              <Route path="/login" element={<Login/>}/>
            
              <Route path="/logworkout" element={
                <ProtectedRoute>
                  <LogWorkout />
                </ProtectedRoute>
              }/>
            
              
              <Route path='/history' element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } />
        
              <Route path='/your-prs' element={
                <ProtectedRoute>
                  <Prs />
                </ProtectedRoute> 
              } />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>

        </BrowserRouter>
      </div>
  )
}

export default App
