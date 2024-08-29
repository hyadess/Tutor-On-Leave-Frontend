import { React, useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faBars,
  faPlus,
  faSquarePlus,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import "../css/Navbar.css";

const Navbar = () => {
  const { logout, userId } = useAuth();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("home");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const homeClick = () => {
    setSelected("home");
    navigate("/home");
  };
  const suggestionClick = () => {
    setSelected("suggestion");
    navigate("/suggestion");
    //re render the navbar when the selected is changed
  };
  const lectureClick = () => {
    setSelected("lecture");
    navigate("/allLectures");
  };
  const quizClick = () => {
    setSelected("quiz");
    navigate("/allquiz");
  };
  const chatbotClick = () => {
    setSelected("chatbot");
    navigate("/allconvo");
  };

  return (
    <div className="navbar items-center">
      <h2
        className="navbar-logo-name flex items-center cursor"
        onClick={() => navigate("/home")}
      >
        Code Tutor
      </h2>

      <div className="flex items-center">
        {userId !== null ? (
          <div
            className="navbar-last button-text"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </div>
        ) : (
          <>
            <div className="navbar-button-container">
              <button
                className={`navbar-button ${
                  selected === "home" ? "selected" : ""
                }`}
                onClick={() => homeClick()}
              >
                HOME
              </button>
              <button
                className={`navbar-button ${
                  selected === "suggestion" ? "selected" : ""
                }`}
                onClick={() => suggestionClick()}
              >
                SUGGESTION
              </button>
              <button
                className={`navbar-button ${
                  selected === "lecture" ? "selected" : ""
                }`}
                onClick={() => lectureClick()}
              >
                LECTURE
              </button>
              <button
                className={`navbar-button ${
                  selected === "quiz" ? "selected" : ""
                }`}
                onClick={() => quizClick()}
              >
                QUIZ
              </button>
              <button
                className={`navbar-button ${
                  selected === "chatbot" ? "selected" : ""
                }`}
                onClick={() => chatbotClick()}
              >
                CHATBOT
              </button>
            </div>
            <div>
              <button
                className="navbar-button"
                onClick={() => navigate(`/profile/${userId}`)}
              >
                Profile
              </button>
              <button className="user-button-container" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
