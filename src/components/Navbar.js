import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
    const { logout,userId } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className='navbar flex justify-between items-center'>
            <h2 className='navbar-logo-name flex items-center'>Code Tutor</h2>

            <div className='navbar-last flex items-center space-x-3'>
                <button onClick={()=>navigate('/suggestion')}>Suggestion</button>
                <button onClick={()=>navigate('/allLectures')}>Lecture</button>
                <button onClick={()=>navigate('/allquiz')}>Quizes</button>
                <button onClick={()=>navigate('/allconvo')}>Conversation</button>
                <button onClick={()=>navigate(`/profile/${userId}`)}>Profile</button>
                <button className='logout-button' onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} size='2x'/></button>
            </div>

        </div>
    );
};

export default Navbar;