import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse, faChalkboard, faSubscript, faQuestion, faTrademark, faDumpster, faFire, faList, faEdit } from '@fortawesome/free-solid-svg-icons';
import './LineList.css';
import axios from 'axios';

//for toast

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../../css/Toast.css';

//------------------------

const QuizLineList = ({ current }) => {

    // const convos = [
    //     {
    //         "id": 1,
    //         "name": "convo 1",
    //         "description": "convo 1",
    //     },
    //     {
    //         "id": 2,
    //         "name": "convo 2",
    //         "description": "convo 2",
    //     },
    //     {
    //         "id": 3,
    //         "name": "convo 3",
    //         "description": "convo 3",
    //     },

    // ];

    const [quizes, setQuizes] = useState([]);
    const { userId } = useAuth();
    //navigate
    const navigate = useNavigate();

    const myQuizes = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/quiz/${userId}/get_all`);
            console.log(response);
            setQuizes(response.data);
        }
        catch (error) {
            console.error('Error fetching lectures:', error.response ? error.response.data : error.message);
        }
    }
    const showToast = (type, text) => {
        toast(text, {
            type: { type }, // or 'success', 'error', 'warning', 'info'
            position: 'top-right', // or 'top-left', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'
            autoClose: 2000, // milliseconds
            hideProgressBar: false,
            className: 'toast-container',
            bodyClassName: "toast-body",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

        });
    };


    const openConvo = (index) => {
        //navigate to the convo
        navigate(`/quiz/${index}`);
    }




    useEffect(() => {
        myQuizes();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className='convo-list-container'>
                {
                    quizes.length === 0 ? <div></div> :
                        quizes.map((quiz, index) => (
                            index > 5 || quiz.id == current ? <div></div> :
                                <div className='convo-list-convo'>
                                    <div className='convo-list-text'>
                                        {quiz.topic}
                                    </div>

                                    <div className='convo-list-button-container'>
                                        {/* <div className='convo-list-button' onClick={() => deleteConvo(convo.id)}>
                                            <FontAwesomeIcon icon={faFire} size='1x' />
                                        </div> */}
                                        <div className='convo-list-button' onClick={() => openConvo(quiz.id)}>
                                            <FontAwesomeIcon icon={faEdit} size='1x' />
                                        </div>

                                    </div>
                                </div>


                        ))
                }




            </div>
        </>





    )









};

export default QuizLineList;