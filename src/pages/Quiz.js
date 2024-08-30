import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAsyncError, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse, faDeafness, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../css/Quiz.css';
import axios from 'axios';
import QuizLineList from '../components/lineLists/QuizLineList';

//for toast

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../css/Toast.css';

//------------------------

const Quiz = () => {
    const [isLeftContracted, setIsLeftContracted] = useState(false);


    const { userId } = useAuth();

    const handleLeftToggle = () => {
        setIsLeftContracted(!isLeftContracted);
    };

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [questions, setQuestions] = useState(null)
    const [rightOptions, setRightOptions] = useState(null)
    const [selectedOptions, setSelectedOptions] = useState(null)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)


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

    const setQuiz = async () => {

        try {
            const response = await axios.get(`http://127.0.0.1:8000/quiz/${id}/show`);
            console.log(response);
            setTitle(response.data.Quiz.topic);
            setQuestions(response.data.Questions);
        }
        catch (error) {
            console.error('Error fetching quiz:', error.response ? error.response.data : error.message);
        }

        // let example =
        // {
        //     "Quiz": {
        //         "id": 1,
        //         "title": "first quiz",
        //         "description": "Quiz on DFS and BFS",
        //         "owner_id": 1
        //     },
        //     "Questions": [
        //         {
        //             "Question": {
        //                 "id": 1,
        //                 "text": "where dfs is done?",
        //                 "quiz_id": 1,
        //                 "multiple_choice": false
        //             },
        //             "Options": [
        //                 {
        //                     "id": 1,
        //                     "text": "option 1",
        //                     "ques_id": 1,
        //                     "is_right": true
        //                 },
        //                 {
        //                     "id": 2,
        //                     "text": "option 2",
        //                     "ques_id": 1,
        //                     "is_right": false
        //                 }

        //             ]

        //         },
        //         {
        //             "Question": {
        //                 "id": 2,
        //                 "text": "where bfs is done?",
        //                 "quiz_id": 1,
        //                 "multiple_choice": true
        //             },
        //             "Options": [
        //                 {
        //                     "id": 3,
        //                     "text": "option 1",
        //                     "ques_id": 2,
        //                     "is_right": true
        //                 },
        //                 {
        //                     "id": 4,
        //                     "text": "option 2",
        //                     "ques_id": 2,
        //                     "is_right": true
        //                 }

        //             ]

        //         }
        //     ]
        // }
        // setTitle(example.Quiz.title)
        // //console.log("inside set quiz")
        // setQuestions(example.Questions)

    }

    const changeSelected = (i, j) => {
        // Create a copy of the selectedOptions array
        let changedSelected = selectedOptions.map(row => [...row]);

        // Toggle the selected value
        changedSelected[i][j] = !changedSelected[i][j];

        // Set the new state
        setSelectedOptions(changedSelected);
    };

    useEffect(() => {
        if (isSubmitted)
            checkAnswer();
    }, [isSubmitted])

    // compare selected options with right options if a question's all options are matched for both right and selected options, then it is correct
    const checkAnswer = async () => {
        console.log("answer Checking")
        let score = 0;
        if (questions == null) return
        await questions.forEach((question, i) => {
            let isCorrect = true;
            question.Options.forEach((option, j) => {
                if (rightOptions[i][j] != selectedOptions[i][j]) {
                    isCorrect = false;
                }
            });
            if (isCorrect) {
                score++;
            }

        });
        setScore(score);
    }

    useEffect(() => {
        if (score != 0 && isSubmitted){
            setShowScore(true);
            submit();
        }

        
    }, [score])




    const setAnswers = () => {
        let answerArray = [];
        let selectedArray = [];
        if (questions == null) return
        console.log("questions", questions)
        questions.forEach((question) => {
            let optionArray = [];
            let optionSelected = [];
            question.Options.forEach((option) => {
                optionArray = [...optionArray, option.is_right];
                optionSelected = [...optionSelected, false]; // at first, no one is selected
            });
            answerArray = [...answerArray, optionArray];
            selectedArray = [...selectedArray, optionSelected];

        });
        setRightOptions(answerArray);
        setSelectedOptions(selectedArray);
        console.log("rightOptions", answerArray);
    }



    useEffect(() => {
        setAnswers();
    }, [questions])



    useEffect(() => {
        setQuiz();
    }, [id])





    // render objects................................................................

    const submit = async (e) => {
        console.log(score)
        // showToast('success', 'Submitted successfully');

        // e.preventDefault();
        try {

            console.log(userId, id, score);

            const response = await axios.post('http://127.0.0.1:8000/quiz/attempt', { user_id: userId, quiz_id: id, score: score },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            console.log(userId, id, score);

            // navigate('/home');
        } catch (error) {
            console.error('Login failed:', error);
        }

    }


    const clear = () => {
        let selectedArray = [];
        if (questions == null) return
        questions.forEach((question) => {
            let optionSelected = [];
            question.Options.forEach((option) => {
                optionSelected = [...optionSelected, false]; //no one is selected
            });
            selectedArray = [...selectedArray, optionSelected];
        });
        setSelectedOptions(selectedArray);
        setIsSubmitted(false);
        setShowScore(false);
        // showToast('info', 'Cleared all selections');
    }


    useEffect(() => {
        console.log("selectedOptions changed");
    }, [selectedOptions])



    return (
        <div className='container-diff'>

            <ToastContainer />
            <div className={`left ${isLeftContracted ? 'contracted' : ''}`}>
                <div>
                    <button className='menu-button' onClick={handleLeftToggle}><FontAwesomeIcon icon={faBars} size='2x' /></button>
                </div>
                {/* <div className='new-convo'>
                    <h3 className={`new-convo-text ${isLeftContracted ? 'contracted' : ''}`}>New Quiz</h3>
                    <button className='menu-button add-button'><FontAwesomeIcon icon={faSquarePlus} size='2x' /></button>
                </div> */}

                <div className={`${isLeftContracted ? 'convo-list-contracted' : ''}`}>
                    <QuizLineList current={id} />
                </div>


                <div className='new-convo last'>
                    {/* <h3 className={`new-convo-text ${isLeftContracted ? 'contracted' : ''}`}>Back-to home</h3> */}
                    <button className='menu-button home-button' onClick={() => navigate('/home')}><FontAwesomeIcon icon={faHouse} style={{ fontSize: '26px' }} /></button>
                </div>
            </div>
            <div className={`middle ${isLeftContracted ? 'contracted' : ''}`}>
                <div className={`chat-container ${isLeftContracted ? 'contracted' : ''}`}>
                    <div className='quiz-title'>
                        {title}
                    </div>
                    {
                        questions == null ? <></> :
                            <div className='question-container'>
                                {
                                    questions.map((question, i) => (

                                        <div>
                                            <div className='question'>

                                                <div className='question-no'>{i + 1}</div>

                                                <div className='question-text'>
                                                    {question.Question.text}
                                                </div>

                                            </div>



                                            {
                                                question.Options.map((option, j) => (
                                                    <div className='option'>
                                                        <div className={`option-text ${(selectedOptions && selectedOptions[i][j] == true) ? 'selected' : ''}`} onClick={() => changeSelected(i, j)}>
                                                            {option.text}

                                                        </div>
                                                        <div className='right-answer'>

                                                            {
                                                                isSubmitted && rightOptions && rightOptions[i][j] == true ?
                                                                    <FontAwesomeIcon icon={faCheck} size='2x' /> : <></>
                                                            }
                                                        </div>

                                                    </div>
                                                ))
                                            }


                                        </div>



                                    ))
                                }


                            </div>

                    }

                    <div className='quiz-buttons'>
                        <div className='quiz-button' onClick={() => setIsSubmitted(true)}>
                            SUBMIT
                        </div>
                        <div className='quiz-button clear' onClick={() => clear()}>
                            CLEAR
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )


}

export default Quiz;