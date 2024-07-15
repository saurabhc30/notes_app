import React, {useState} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { HashRouter, Route, Routes, Navigate  } from 'react-router-dom';
import NotesPage from './NotesPage';
import Home from './Home';
import Login from './Componnets/Login';
import Signup from './Componnets/Signup';


function App() {

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>} />
          <Route path="/notes" element={authenticated ? <NotesPage /> : <Navigate to="/login" />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </HashRouter>

  );
}

export default App;
