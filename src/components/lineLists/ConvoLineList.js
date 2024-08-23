import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse, faChalkboard, faSubscript, faQuestion, faTrademark, faDumpster, faFire, faList, faEdit } from '@fortawesome/free-solid-svg-icons';
import './LineList.css';
import axios from 'axios';


const ConvoLineList = () => {

    const convos = [
        {
            "id": 1,
            "name": "convo 1",
            "description": "convo 1",
        },
        {
            "id": 2,
            "name": "convo 2",
            "description": "convo 2",
        },
        {
            "id": 3,
            "name": "convo 3",
            "description": "convo 3",
        },

    ];

    const openConvo = (index) => {

        console.log(`${index} th convo opened`)
    }
    const deletConvo = (index) => {

        console.log(`${index} th convo deleted`)
    }



    return (
        <div className='convo-list-container'>

            {
                convos.map((convo, index) => (
                    <div className='convo-list-convo'>
                        <div className='convo-list-text'>
                            {convo.name}
                        </div>

                        <div className='convo-list-button-container'>
                            <div className='convo-list-button' onClick={() => deletConvo(index)}>
                                <FontAwesomeIcon icon={faFire} size='1x' />
                            </div>
                            <div className='convo-list-button' onClick={() => openConvo(index)}>
                                <FontAwesomeIcon icon={faEdit} size='1x' />
                            </div>

                        </div>
                    </div>


                ))
            }




        </div>




    )









};

export default ConvoLineList;