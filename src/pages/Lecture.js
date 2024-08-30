// src/components/Dashboard.js
import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse, faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import '../css/Convo.css';
import axios from 'axios';
import ConvoLineList from '../components/lineLists/ConvoLineList';
import LectureLineList from '../components/lineLists/LectureLineList';
import TeacherConvo from './TeacherConvo';
const Lecture = () => {
    const { userId, logout } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const [isLeftContracted, setIsLeftContracted] = useState(false);

    const handleLeftToggle = () => {
        setIsLeftContracted(!isLeftContracted);
    };

    //toggle overlay
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const toggleOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
    };

    // an example lecture response.data:


    // {
    // "lecture": {
    //     "isStarred": false,
    //     "topic": "dfs",
    //     "current_question": 1,
    //     "owner_id": 1,
    //     "updated_at": "2024-08-22T17:04:35.061183",
    //     "id": 1,
    //     "total_questions": 10,
    //     "teacher_convo_id": 2,
    //     "created_at": "2024-08-22T17:04:35.061183"
    // },
    // "questions": [
    //     {
    //     "serial_no": 1,
    //     "id": 1,
    //     "text": "What does DFS stand for in computer science?",
    //     "answer": "",
    //     "lecture_id": 1
    //     },
    //     {
    //     "serial_no": 2,
    //     "id": 2,
    //     "text": "What is the main purpose of Depth First Search (DFS)?",
    //     "answer": "",
    //     "lecture_id": 1
    //     },
    //     {
    //     "serial_no": 3,
    //     "id": 3,
    //     "text": "How does DFS traverse a graph or tree data structure?",
    //     "answer": "",
    //     "lecture_id": 1
    //     },
    //     {
    //     "serial_no": 4,
    //     "id": 4,
    //     "text": "What is the difference between DFS and BFS (Breadth First Search)?",
    //     "answer": "",
    //     "lecture_id": 1
    //     },
    //     {
    //     "serial_no": 5,
    //     "id": 5,
    //     "text": "What data structure is commonly used to implement DFS?",
    //     "answer": "",
    //     "lecture_id": 1
    //     },
    //     {
    //     "serial_no": 6,
    //     "id": 6,
    //     "text": "What are the key steps involved in implementing DFS algorithm?",
    //     "answer": "",
    //     "lecture_id": 1
    //     },
    //     {
    //     "serial_no": 7,
    //     "id": 7,
    //     "text": "How does DFS handle cycles in a graph during traversal?",
    //     "answer": "",
    //     "lecture_id": 1
    //     },
    //     {
    //     "serial_no": 8,
    //     "id": 8,
    //     "text": "What is backtracking in the context of DFS?",
    //     "answer": "",
    //     "lecture_id": 1
    //     },
    //     {
    //     "serial_no": 9,
    //     "id": 9,
    //     "text": "Can you give an example of when DFS is more suitable than BFS for solving a problem?",
    //     "answer": "",
    //     "lecture_id": 1
    //     },
    //     {
    //     "serial_no": 10,
    //     "id": 10,
    //     "text": "What is the time complexity of Depth First Search algorithm?",
    //     "answer": "",
    //     "lecture_id": 1
    //     }
    // ]
    // }

    const [lecture, setLecture] = useState({});
    const [questionTexts, setQuestionTexts] = useState([]);
    const [messages, setMessages] = useState([]);


    const [newMessage, setNewMessage] = useState('');
    const [needanswer, setNeedanswer] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');



    const messageListRef = useRef(null);
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);


    // user replies with a answer...............................................................................................

    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            if (needanswer === 1)
                return;
            setNeedanswer(1);
            setMessages([...messages, { text: newMessage, type: 'text', sender: 'system' }]);
            setCurrentAnswer(newMessage);
            setNewMessage('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };




    // backend query to check answer...............................................................................................

    const queryBackend = async () => {

        try {
            console.log(currentAnswer);
            const response = await axios.post(`http://127.0.0.1:8000/test/checkAnswer`, {
                user_id: userId,
                lecture_id: id,
                answer: currentAnswer
            });
            console.log(response.data);
            //check response.data.status to see if the answer is correct or not
            if (response.data.status === 'correct') {
                setMessages([...messages, { text: response.data.response, type: 'text', sender: 'user' }]);

                // if the current question is the last question, then end the lecture
                if (lecture.current_question === lecture.total_questions) {
                    setMessages([...messages, { text: 'Lecture ended. Thank you for participating.', type: 'text', sender: 'user' }]);
                    return;
                }
                // add the new current question in the messages
                setMessages([...messages, { text: "Your answer seems correct to me", type: 'text', sender: 'user' },
                { text: questionTexts[lecture.current_question], type: 'text', sender: 'user' }]);
                //increment the current_question in the lecture
                setLecture({ ...lecture, current_question: lecture.current_question + 1 });

            }
            else {
                setMessages([...messages, { text: response.data.response, type: 'text', sender: 'user' }]);
            }
        }
        catch (error) {
            console.error('Error querying backend:', error.response ? error.response.data : error.message);

        }

    }

    useEffect(() => {

        if (needanswer === 1) {
            queryBackend();
            setNeedanswer(0);
        }

    }, [needanswer]);




    // at start...............................................................................................

    const loadLecture = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/lecture/${id}/show`);

            setLecture(response.data.lecture);
            setQuestionTexts(response.data.questions.map((question) => question.text));


            //messages will be all answers and question texts before current question and then
            let messages = [];
            response.data.questions.slice(0, response.data.lecture.current_question - 1).forEach((question) => {
                messages.push({ text: question.text, type: 'text', sender: 'user' });
                messages.push({ text: question.answer, type: 'text', sender: 'system' });
            });
            //also add the current question from the reponse data, not the set state
            messages.push({ text: response.data.questions[response.data.lecture.current_question - 1].text, type: 'text', sender: 'user' });

            console.log(messages);
            setMessages(messages);

        }
        catch (error) {
            console.error('Error loading conversation:', error.response ? error.response.data : error.message);
        }
    }

    useEffect(() => {
        loadLecture();
    }, []);
    useEffect(() => {
        loadLecture();
    }, [id]);


    // parse response...............................................................................................
    const parseResponse = (text, sender) => {
        const parts = text.split(/(```[\s\S]*?```)/);
        return parts.map((part, index) => {
            if (part.startsWith('```') && part.endsWith('```')) {
                return (
                    <pre key={index} className="code-block">
                        <code>{part.slice(3, -3)}</code>
                    </pre>
                );
            }
            return <div key={index} className={`chat-message ${sender}`}>{part}</div>;
        });
    };




    return (
        <div className="container-diff">
            <div className={`left ${isLeftContracted ? 'contracted' : ''}`}>
                <div>
                    <button className='menu-button' onClick={handleLeftToggle}><FontAwesomeIcon icon={faBars} size='2x' /></button>
                </div>
                {/* <div className='new-convo'>
                    <h3 className={`new-convo-text ${isLeftContracted ? 'contracted' : ''}`}>New Conversation</h3>
                    <button className='menu-button add-button'><FontAwesomeIcon icon={faSquarePlus} size='3x' /></button>
                </div> */}

                <div className={`${isLeftContracted ? 'convo-list-contracted' : ''}`}>
                    < LectureLineList current={id} />
                </div>



                <div className='new-convo last'>
                    {/* <h3 className={`new-convo-text ${isLeftContracted ? 'contracted' : ''}`}>Back-to home</h3> */}
                    <button className='menu-button home-button' onClick={() => toggleOverlay()}><FontAwesomeIcon icon={faChalkboardUser} size='2x' /></button>
                    <button className='menu-button home-button' onClick={() => navigate('/home')}><FontAwesomeIcon icon={faHouse} style={{ fontSize: '26px' }} /></button>
                </div>


            </div>



            <div className={`middle ${isLeftContracted ? 'contracted' : ''}`}>
                <div className={`chat-container ${isLeftContracted ? 'contracted' : ''}`} ref={messageListRef}>
                    {messages.map((message, index) => (
                        message.type === 'text' ?

                            <div>{parseResponse(message.text, message.sender)}</div>
                            : <img src={message.text} alt='image' className={`chat-message ${message.sender}`} />
                    ))}
                </div>
                <div className={`input-container ${isLeftContracted ? 'contracted' : ''}`}>

                    <textarea
                        type="text"
                        className='chat-input'

                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                    />


                    <button className='send-button' onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane} size='3x' /></button>


                </div>
            </div>

            {
                lecture.teacher_convo_id &&
                <TeacherConvo id={lecture.teacher_convo_id} isOverlayVisible={isOverlayVisible} toggleOverlay={toggleOverlay} />
            }






        </div>
    );
};

export default Lecture;