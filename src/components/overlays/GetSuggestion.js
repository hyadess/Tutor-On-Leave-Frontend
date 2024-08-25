import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse, faCross, faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './CreateConvo.css'
import Loader from '../loader/Loader';
import SuggestionList from '../lists/SuggestionList';



const GetSuggestion = (props) => {
    const { userId } = useAuth();
    const navigate = useNavigate();
    const [sessionName, setSessionName] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const convoCreateRequest = async () => {
        try {
            // Log the data before making the request
            console.log('Creating conversation with:', { name: sessionName, user_id: userId });

            // Check if sessionName and userId are set
            if (!sessionName || !userId) {
                console.error('Session name or user ID is missing');
                return;
            }

            props.toggleOverlay();
            // a loading screen until request completes
            setLoading(true);

            const response = await axios.post('http://127.0.0.1:8000/test/suggestion', {
                topic: sessionName,
                user_id: userId,
                type: 'code'

            });
            console.log(response);
            setSuggestions(response.data.suggestions);
            //navigate(`/conversation/${response.data.id}`);


        } catch (error) {
            console.error('Error creating conversation:', error.response ? error.response.data : error.message);
        }

    };

    const suggestionCrossed = () => {
        setSessionName('');
        props.toggleOverlay();
        setShowSuggestions(false);
    }


    useEffect(() => {
        setLoading(false);

        setSessionName('');
        if (suggestions.length > 0) {
            props.toggleOverlay();
            setShowSuggestions(true);
        }

    }, [suggestions]);




    return (
        loading ? <Loader loading={loading} /> :

            <div className={`overlay ${props.isOverlayVisible ? 'visible' : ''}`} id="overlay">
                {
                    showSuggestions ?
                        <div className='overlay-content-2'>
                            <div className='overlay-cross-button-container'>
                                <div className='overlay-cross-button' onClick={() => suggestionCrossed()}>
                                    <FontAwesomeIcon icon={faClose} size='1x' />

                                </div>
                            </div>
                            <SuggestionList suggestions={suggestions} isAll={true} />
                        </div>

                        :
                        <div className='overlay-content'>

                            <div className='overlay-cross-button-container'>
                                <div className='overlay-cross-button' onClick={() => props.toggleOverlay()}>
                                    <FontAwesomeIcon icon={faClose} size='1x' />

                                </div>
                            </div>

                            {/* <div className='session-text'>ENTER SESSION NAME</div> */}


                            <div className='flex-div pb-5'>
                                <div className='w-[85%] h-[100%]'>
                                    <textarea type="text" className="input-field"
                                        placeholder="Topic for suggestion?..."
                                        value={sessionName}
                                        onChange={(e) => setSessionName(e.target.value)}
                                    />
                                </div>
                                <button className='name-submit-button' onClick={() => convoCreateRequest()}>
                                    <FontAwesomeIcon icon={faPaperPlane} size='1x' />
                                </button>
                            </div>




                        </div>
                }

            </div>



    );





};


export default GetSuggestion;