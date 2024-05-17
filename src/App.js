import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import './App.css';
import LoadingBar from 'react-top-loading-bar';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      showAlert(null);
    }, 2000);
  };

  const [progress, setProgress] = useState(0);

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <LoadingBar
            color='skyblue'
            progress={progress} 
            height={"3px"}
            onLoaderFinished={() => setProgress(0)}/>
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/CloudBook" element={<Home setProgress={setProgress} showAlert={showAlert} />} />
            <Route exact path="/about_us" element={<About setProgress={setProgress}/>} />
            <Route exact path="/login" element={<Login setProgress={setProgress} showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup setProgress={setProgress} showAlert={showAlert} />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
