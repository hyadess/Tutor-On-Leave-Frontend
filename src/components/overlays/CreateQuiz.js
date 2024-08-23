import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse, faCross, faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './CreateConvo.css'
import Loader from '../loader/Loader';

const CreateQuiz = (props) => {

    // from props, we will get isOverlayVisible and toggleOverlay
    const { userId } = useAuth();
    const navigate = useNavigate();
    const [sessionName, setSessionName] = useState('');
    const [Loading, setLoading] = useState(false);
    const [paid, setPaid] = useState('FREE');
    const [hardness, setHardness] = useState('BEGINNER');

    const togglePaid = () => {
        if (paid === 'FREE')
            setPaid('PAID')
        else
            setPaid('FREE')
    }

    const toggleHardness = () => {
        if (hardness === 'BEGINNER')
            setHardness('ADVANCED')
        else
            setHardness('BEGINNER')
    }


    const convoCreateRequest = async () => {
        try {
            // Log the data before making the request
            console.log('Creating conversation with:', { name: sessionName, user_id: userId });

            // Check if sessionName and userId are set
            if (!sessionName || !userId) {
                console.error('Session name or user ID is missing');
                return;
            }
            setLoading(true);

            const response = await axios.post('http://127.0.0.1:8000/test/quiz', {
                topic: sessionName,
                user_id: userId,
                //isFree: paid === 'FREE',
                //isAdvanced: hardness === 'ADVANCED',
                //isTeacher: false
            });

            props.toggleOverlay();
            setSessionName('');
            console.log(response);
            setLoading(false);
            navigate(`/quiz/${response.data.quiz_id}`);
        } catch (error) {
            console.error('Error creating quiz:', error.response ? error.response.data : error.message);
        }

    };




    return (
        Loading ? <Loader loading={Loading} /> :

            <div className={`overlay ${props.isOverlayVisible ? 'visible' : ''}`} id="overlay">

                <div className='overlay-content'>

                    <div className='overlay-cross-button-container'>
                        <div className='overlay-cross-button' onClick={() => props.toggleOverlay()}>
                            <FontAwesomeIcon icon={faClose} size='1x' />

                        </div>
                    </div>

                    {/* <div className='session-text'>ENTER SESSION NAME</div> */}


                    <div className='flex-div'>
                        <div >
                            <textarea type="text" className="input-field"
                                placeholder="Name your chatbot..."
                                value={sessionName}
                                onChange={(e) => setSessionName(e.target.value)}
                            />
                        </div>
                        <button className='name-submit-button' onClick={() => convoCreateRequest()}>
                            <FontAwesomeIcon icon={faPaperPlane} size='2x' />
                        </button>
                    </div>

                    <div className='create-convo-options'>
                        <div className={`create-convo-option ${paid == 'FREE' ? '' : 'red'}`} onClick={() => togglePaid()}>
                            {paid}
                        </div>
                        <div className={`create-convo-option ${hardness == 'BEGINNER' ? '' : 'red'}`} onClick={() => toggleHardness()}>
                            {hardness}
                        </div>

                    </div>




                </div>

            </div>



    );





};


export default CreateQuiz;