// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Convo from './pages/Convo';
import Quiz from './pages/Quiz'
import Lecture from './pages/Lecture';
import AuthProvider, { useAuth } from './context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Route path="/" element={<Navigate replace to={"/login"} />} />
      }
    />
  );
};

function App() {
  return (
    <div >
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/" element={<Navigate replace to={"/login"} />} />
            <Route path="/conversation/:id" element={<Convo/>} />
            <Route path="/lecture/:id" element={<Lecture/>} />
            <Route path='/quiz/:id' element={<Quiz/>}/>
          </Routes>
        </Router>
      </AuthProvider>

    </div>
    
  );
}

export default App;