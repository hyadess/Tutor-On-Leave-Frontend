// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Convo from "./pages/Convo";
import Quiz from "./pages/Quiz";
import Lecture from "./pages/Lecture";
import AuthProvider, { useAuth } from "./context/AuthContext";
import Suggestion from "./pages/AllContent/Suggestion";
import AllLecture from "./pages/AllContent/AllLecture";
import AllQuiz from "./pages/AllContent/AllQuiz";
import AllConvo from "./pages/AllContent/AllConvo";
import Profile from "./pages/profile";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Route path="/" element={<Navigate replace to={"/login"} />} />
        )
      }
    />
  );
};

function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/signup"];
  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/conversation/:id" element={<Convo />} />
        <Route path="/lecture/:id" element={<Lecture />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/suggestion" element={<Suggestion />} />
        <Route path="/allLectures" element={<AllLecture />} />
        <Route path="/allquiz" element={<AllQuiz />} />
        <Route path="/allconvo" element={<AllConvo />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
