import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import Header from "./landing/Header";
import Login from "./landing/Login";
import Register from "./landing/Register";
import MeetingList from "./landing/MeetingList";

function App() {
  return (
    <div className='page'>
        <Header className="App-header" />
        <main className='content'>
            <Routes>
                <Route path='/' element={<Navigate to='/meeting-list' replace={true}/>}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/meeting-list' element={<MeetingList />}/>
            </Routes>
        </main>
    </div>
  );
}

export default App;
