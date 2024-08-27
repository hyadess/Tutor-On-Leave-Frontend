import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAsyncError, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse, faChalkboard, faSubscript, faQuestion, faTrademark, faDumpster, faFire, faList, faEdit, faGlobe, faStar, faTag, faMarker } from '@fortawesome/free-solid-svg-icons';
import './List.css';
import axios from 'axios';

//for toast

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../../css/Toast.css';

//------------------------



const QuizList = (props) => {

    // const quizes = [
    //     {
    //         "id": 1,
    //         "title": "quiz 1",
    //         "description": "quiz description",
    //         "score": 75,
    //         "state": 1,
    //     },
    //     {
    //         "id": 2,
    //         "title": "quiz 1",
    //         "description": "quiz description",
    //         "score": 75,
    //         "state": 2,
    //     },
    //     {
    //         "id": 3,
    //         "title": "quiz 1",
    //         "description": "quiz description",
    //         "score": 75,
    //         "state": 3,
    //     },
    //     {
    //         "id": 4,
    //         "title": "quiz 1",
    //         "description": "quiz description",
    //         "score": 75,
    //         "state": 4,
    //     },
    //     {
    //         "id": 5,
    //         "title": "quiz 1",
    //         "description": "quiz description",
    //         "score": 75,
    //         "state": 4,
    //     },
    //     {
    //         "id": 6,
    //         "title": "quiz 1",
    //         "description": "quiz description",
    //         "score": 75,
    //         "state": 4,
    //     },
    //     {
    //         "id": 7,
    //         "title": "quiz 1",
    //         "description": "quiz description",
    //         "score": 75,
    //         "state": 3,
    //     },
    //     {
    //         "id": 8,
    //         "title": "quiz 1",
    //         "description": "quiz description",
    //         "score": 75,
    //         "state": 2,
    //     },
    //     {
    //         "id": 9,
    //         "title": "quiz 1",
    //         "description": "quiz description",
    //         "score": 75,
    //         "state": 1,
    //     },


    // ]
    const { userId } = useAuth();
    const navigate = useNavigate();
    const [selected, setSelected] = useState('all')
    const [quizes, setQuizes] = useState([])

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


    const makeImportant = async(i) => {
        console.log(`${i} th quiz is made important`)
        const response = await axios.post(`http://127.0.0.1:8000/quiz/highlight`, {
            user_id: userId,
            quiz_id: i
        });
        console.log(response.data)
        // now we are getting the updated suggestion from the data, update the suggestions where the id matches 
        const updatedQuiz = response.data;

        if( updatedQuiz === null){
            return;
        }
        else{
            if( updatedQuiz.state % 2 == 0){
                showToast('success', 'Quiz is highlighted');
            }
            else{
                showToast('success', 'Quiz is unhighlighted');
            }
        }

        const updatedQuizes = quizes.map(quiz => {
            if (quiz.id === updatedQuiz.id) {
                return updatedQuiz;
            }
            return quiz;
        });
        setQuizes(updatedQuizes);

    }

    const visit = (i) => {
        navigate(`/quiz/${i}`);

    }

    const allPressed = () => {
        console.log(props.isAll)
        navigate('/allquiz')
    }

    useEffect(() => {
        setQuizes(props.quizes)
    }, [props.quizes])



    return (


        <div className='whole-thing-container'>
            <ToastContainer />

            <div className='suggestion-list-title-container'>
                <div className='flex'>
                    <div className='suggestion-list-title'>
                        PAST QUIZES
                    </div>
                    {
                        props.isAll === false ? <div className='suggestion-see-all' onClick={() => allPressed()}>
                            See All
                        </div> : <></>
                    }
                    </div>

                <div className='suggestion-title-buttons'>
                    <div className={`suggestion-title-button ${selected == 'all' ? 'selected' : ''}`} onClick={() => setSelected('all')}> All</div>

                    <div className={`suggestion-title-button ${selected == 'starred' ? 'selected' : ''}`} onClick={() => setSelected('starred')}> starred</div>
                    <div className={`suggestion-title-button ${selected == 'unattempted' ? 'selected' : ''}`} onClick={() => setSelected('unattempted')}> unattempted</div>
                </div>

            </div>

            <div className='suggestion-list-container' >
                {
                    quizes.map((quiz, index) => (
                        (selected === 'all' || (selected === 'starred' && quiz.state > 2) ||
                            (selected === 'unattempted' && quiz.state % 2 == 0)) && (props.isAll === true || (props.isAll === false && index < 7)) ?
                            <div className='suggestion-container'>
                                <div className='suggestion-text-container'>

                                    <div className='suggestion-name red' onClick={()=>visit(quiz.id)}>
                                        {quiz.topic}
                                    </div>

                                    {/* <div className='suggestion-horizontal-line'>
                            </div> */}

                                    <div className='suggestion-tag'>
                                        <div className='tag-icon'><FontAwesomeIcon icon={faMarker} size='1x' /></div>

                                        <div className='suggestion-tag-text'>
                                            {((quiz.score/quiz.total_questions) * 100).toFixed(2)}% correct 
                                        </div>

                                    </div>


                                </div>



                                <div className='suggestion-lower-part'>

                                    <div className='visition'>
                                        <div className={`visition-text ${quiz.state % 2 == 1 ? 'visited' : ''}`}>
                                            {quiz.state % 2 == 1 ? 'attempted' : 'not attempted'}
                                        </div>
                                    </div>

                                    <div className='suggestion-buttons'>
                                        <div className={`suggestion-button ${quiz.state > 2 ? 'imp' : ''}`} onClick={() => makeImportant(quiz.id)}>
                                            <FontAwesomeIcon icon={faStar} size='1x' />
                                        </div>
                                        <div className='suggestion-button' onClick={() => visit(quiz.id)}>
                                            <FontAwesomeIcon icon={faEdit} size='1x' />
                                        </div>

                                    </div>
                                </div>


                            </div> : <></>


                    ))
                }

            </div>


            <div className='end-horizontal-line'>

            </div>
        </div>






    );








};


export default QuizList;