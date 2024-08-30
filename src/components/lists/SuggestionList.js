import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAsyncError, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse, faChalkboard, faSubscript, faQuestion, faTrademark, faDumpster, faFire, faList, faEdit, faGlobe, faStar, faTag } from '@fortawesome/free-solid-svg-icons';
import './List.css';
import axios from 'axios';

//for toast

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../../css/Toast.css';
import Navbar from '../Navbar';

//------------------------


const SuggestionList = (props) => {
    //useAuth for user id
    const { userId } = useAuth();
    const navigate = useNavigate();
    // as props, we will get isAll ( for short list) and a suggestions list
    const [suggestions, setSuggestions] = useState([]);

    // const suggestions = [
    //     {
    //         "id": 1,
    //         "placeholder": "the huge text problem that",
    //         "link": "visit_here",
    //         "source": "codeforces",
    //         "state": 1,
    //     },
    //     {
    //         "id": 2,
    //         "placeholder": "problem 2",
    //         "link": "visit_here",
    //         "source": "codeforces",
    //         "state": 2,
    //     },
    //     {
    //         "id": 3,
    //         "placeholder": "problem 3",
    //         "link": "visit_here",
    //         "source": "Leetcode",
    //         "state": 3,
    //     },
    //     {
    //         "id": 4,
    //         "placeholder": "problem 4",
    //         "link": "visit_here",
    //         "source": "codeforces",
    //         "state": 4,
    //     },
    //     {
    //         "id": 5,
    //         "placeholder": "problem 5",
    //         "link": "visit_here",
    //         "source": "codeforces",
    //         "state": 4,
    //     },
    //     {
    //         "id": 6,
    //         "placeholder": "problem 6",
    //         "link": "visit_here",
    //         "source": "codeforces",
    //         "state": 4,
    //     },
    //     {
    //         "id": 7,
    //         "placeholder": "problem 7",
    //         "link": "visit_here",
    //         "source": "codeforces",
    //         "state": 4,
    //     },
    //     {
    //         "id": 8,
    //         "placeholder": "problem 8",
    //         "link": "visit_here",
    //         "source": "codeforces",
    //         "state": 4,
    //     },
    //     {
    //         "id": 9,
    //         "placeholder": "problem 9",
    //         "link": "visit_here",
    //         "source": "codeforces",
    //         "state": 4,
    //     },


    // ]

    // 
    const [selected, setSelected] = useState('all')

    // load suggestions every time when the props.suggestions changes
    useEffect(() => {
        console.log('suggestions:', props.suggestions);
        setSuggestions(props.suggestions);
    }, [props.suggestions]);



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


    const makeImportant = async (i) => {

        console.log(`${i} th suggestion is made important`)
        const response = await axios.post(`http://127.0.0.1:8000/suggestion/highlight`, {
            user_id: userId,
            suggestion_id: i
        });
        console.log(response.data)
        // now we are getting the updated suggestion from the data, update the suggestions where the id matches 
        const updatedSuggestion = response.data;

        if( updatedSuggestion === null){
            return;
        }
        else{
            // if( updatedSuggestion.state % 2 == 0){
            //     showToast('success', 'Suggestion is highlighted');
            // }
            // else{
            //     showToast('success', 'Suggestion is unhighlighted');
            // }
        }

        const updatedSuggestions = suggestions.map(suggestion => {
            if (suggestion.id === updatedSuggestion.id) {
                return updatedSuggestion;
            }
            return suggestion;
        });
        setSuggestions(updatedSuggestions);

    }

    const visit = async (i, link) => {

        console.log(`${i} th suggestion is visited`)
        const response = await axios.post(`http://127.0.0.1:8000/suggestion/visit`, {
            user_id: userId,
            suggestion_id: i
        });
        console.log(response.data)
        // now we are getting the updated suggestion from the data, update the suggestions where the id matches
        const updatedSuggestion = response.data;
        if( updatedSuggestion === null){
            return;
        }
        else{
            // if( updatedSuggestion.state > 2){
            //     showToast('success', 'Suggestion is visited');
            // }
            // else{
            //     showToast('success', 'Suggestion is unvisited');
            // }
        }

        const updatedSuggestions = suggestions.map(suggestion => {
            if (suggestion.id === updatedSuggestion.id) {
                return updatedSuggestion;
            }
            return suggestion;
        });
        setSuggestions(updatedSuggestions);

        window.open(link, '_blank', 'noopener,noreferrer');

    }

    const deleteSuggestion = async (i) => {
        console.log(`${i} th suggestion is deleted`)
        const response = await axios.post(`http://127.0.0.1:8000/suggestion/delete`, {
            user_id: userId,
            suggestion_id: i
        });
        console.log(response.data)
        // now we are getting the updated suggestion from the data, delete the suggestion where the id matches

        const updatedSuggestions = suggestions.filter(suggestion => suggestion.id !== i);
        setSuggestions(updatedSuggestions);
        const message = response.data.message;
        // if( message === "suggestion deleted"){
        //     showToast('success', 'Suggestion is deleted');
        // }


    }


    
    const allPressed = () => {
        navigate(`/suggestion/`);
        console.log(props.isAll)
    }

    return (


        <div className='whole-thing-container'>
            <ToastContainer />
            

            <div className='suggestion-list-title-container'>
                <div className='flex'>
                    <div className='suggestion-list-title'>
                        PAST SUGGESTIONS
                    </div>
                    {
                        props.isAll === false ? <div className='suggestion-see-all' onClick={() => allPressed()}>
                            See All
                        </div> : <></>
                    }
                </div>

                <div className='suggestion-title-buttons'>
                    <div className={`suggestion-title-button ${selected == 'all' ? 'selected' : ''}`} onClick={() => setSelected('all')}> All</div>

                    <div className={`suggestion-title-button ${selected == 'highlighted' ? 'selected' : ''}`} onClick={() => setSelected('highlighted')}> starred</div>
                    <div className={`suggestion-title-button ${selected == 'unvisited' ? 'selected' : ''}`} onClick={() => setSelected('unvisited')}> unvisited</div>
                </div>

            </div>

            <div className='suggestion-list-container' >
                {
                    suggestions &&
                    suggestions.map((suggestion, index) => (
                        (selected === 'all' || (selected === 'highlighted' && suggestion.state % 2 == 0) ||
                            (selected === 'unvisited' && suggestion.state < 3)) && (props.isAll === true || (props.isAll === false && index < 7)) ?
                            <div className='suggestion-container'>
                                <div className='suggestion-text-container'>

                                    <div className='suggestion-name orange' onClick={()=>visit(suggestion.id,suggestion.link)}>
                                        {suggestion.placeholder}
                                    </div>

                                    {/* <div className='suggestion-horizontal-line'>
                            </div> */}

                                    <div className='suggestion-tag'>
                                        <div className='tag-icon'><FontAwesomeIcon icon={faTag} size='1x' /></div>

                                        <div className='suggestion-tag-text'>
                                            {suggestion.source}
                                        </div>

                                    </div>

                                </div>
                                <div className='suggestion-lower-part'>

                                    <div className='visition'>
                                        <div className={`visition-text ${suggestion.state > 2 ? 'visited' : ''}`}>
                                            {suggestion.state > 2 ? 'visited' : 'not visited'}
                                        </div>
                                    </div>

                                    <div className='suggestion-buttons'>
                                        <div className={`suggestion-button ${suggestion.state % 2 == 0 ? 'imp' : ''}`} onClick={() => makeImportant(suggestion.id)}>
                                            <FontAwesomeIcon icon={faStar} size='1x' />
                                        </div>
                                        <div className='suggestion-button' onClick={() => visit(suggestion.id, suggestion.link)}>
                                            <FontAwesomeIcon icon={faGlobe} size='1x' />
                                        </div>
                                        <div className='suggestion-button' onClick={() => deleteSuggestion(suggestion.id)}>
                                            <FontAwesomeIcon icon={faFire} size='1x' />
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


export default SuggestionList;