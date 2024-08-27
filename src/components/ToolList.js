import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse, faChalkboard, faSubscript, faQuestion, faTrademark } from '@fortawesome/free-solid-svg-icons';
import '../css/ToolList.css';
import axios from 'axios';
import CreateConvo from './overlays/CreateConvo';
import GetSuggestion from './overlays/GetSuggestion';
import CreateQuiz from './overlays/CreateQuiz';


const ToolList = () => {

    const { userId } = useAuth();
    const [isTutor,setIsTutor] = useState(false);
    const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);
    const toggleSuggestionOverlay = () => {
        setSuggestionsVisible(!isSuggestionsVisible);
    }
    const [isQuizVisible, setQuizVisible] = useState(false);
    


    return (

        <div className='tool-list-container'>
            <div className='tool-list-title'>
                OUR TOOLS
            </div>
            {/* <div className='horizontal-line'>

            </div> */}

            <div className='tool-list'>


                <div className='tool-container' onClick={()=>setIsTutor(true)}>
                    {/* <div className='tool-image'>
                        <FontAwesomeIcon icon={faChalkboard} size='1x' />
                    </div> */}
                    <div className='tool-text'>
                        <div className='tool-name'>
                            Tutor
                        </div>
                    </div>
                </div>



                <div className='tool-container' onClick={()=>setQuizVisible(true)}>
                    {/* <div className='tool-image'>
                        <FontAwesomeIcon icon={faQuestion} size='1x' />
                    </div> */}
                    <div className='tool-text '>
                        <div className='tool-name red'>
                            Quiz Builder
                        </div>
                        {/* <div className='horizontal-line'>

                        </div> */}

                    </div>
                </div>



                <div className='tool-container' onClick={()=>setSuggestionsVisible(true)}>
                    {/* <div className='tool-image'>
                        <FontAwesomeIcon icon={faSubscript} size='1x' />

                    </div> */}
                    <div className='tool-text '>
                        <div className='tool-name orange'>
                            Suggester
                        </div>
                    </div>
                </div>



                <div className='tool-container'>
                    {/* <div className='tool-image'>
                        <FontAwesomeIcon icon={faTrademark} size='1x' />
                    </div> */}
                    <div className='tool-text'>
                        <div className='tool-name'>
                            Tutor Pro
                        </div>
                    </div>
                </div>




            </div>


            <CreateConvo isOverlayVisible={isTutor} toggleOverlay={()=>setIsTutor(false)}/>
            <GetSuggestion isOverlayVisible={isSuggestionsVisible} toggleOverlay={toggleSuggestionOverlay} />
            <CreateQuiz isOverlayVisible={isQuizVisible} toggleOverlay={()=>setQuizVisible(!isQuizVisible)} />
            

        </div>





    );





}

export default ToolList