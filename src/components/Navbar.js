import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className='navbar'>
            <h2 className='navbar-logo-name'>Code Tutor</h2>

            <div className='navbar-last'>
                <button className='logout-button' onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} size='2x'/></button>
            </div>

        </div>
    );
};

export default Navbar;