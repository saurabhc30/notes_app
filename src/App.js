import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { HashRouter, Route, Routes } from 'react-router-dom';
import NotesPage from './NotesPage';
import Home from './Home';
import Login from './Componnets/Login';
import Signup from './Componnets/Signup';


function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </HashRouter>

  );
}

export default App;
