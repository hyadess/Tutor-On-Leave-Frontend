import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAsyncError, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse, faChalkboard, faSubscript, faQuestion, faTrademark, faDumpster, faFire, faList, faEdit, faGlobe, faStar, faTag, faLaughWink } from '@fortawesome/free-solid-svg-icons';
import './List.css';
import ProgressBar from '../progressBar/ProgressBar';
import axios from 'axios';


//for toast

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../../css/Toast.css';

//------------------------


const LectureList = (props) => {
    //useAuth for user id
    const { userId } = useAuth();
    const navigate = useNavigate();

    // as props, we will get isAll ( for short list) and a suggestions list
    const [lectures, setLectures] = useState([]);
    const [selected, setSelected] = useState('all')

    // load lectures every time when the props.suggestions changes
    useEffect(() => {
        console.log('lectures:', props.lectures);
        setLectures(props.lectures);
    }, [props.lectures]);



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

        console.log(`${i} th lecture is made important`)
        const response = await axios.post(`http://127.0.0.1:8000/lecture/${i}/toggleStarred`);
        console.log(response.data)
        // now we are getting the updated suggestion from the data, update the suggestions where the id matches 
        const updatedLecture = response.data;

        if( updatedLecture === null){
            return;
        }
        else{
            if( updatedLecture.isStarred === true){
                showToast('success', 'Lecture is highlighted');
            }
            else{
                showToast('success', 'Lecture is unhighlighted');
            }
        }

        const updatedLectures = lectures.map(lecture => {
            if (lecture.id === updatedLecture.id) {
                return updatedLecture;
            }
            return lecture;
        });
        setLectures(updatedLectures);

    }

    const deleteLecture = async (i) => {
        console.log(`${i} th lecture is deleted`)
        const response = await axios.delete(`http://127.0.0.1:8000/lecture/${i}/delete`);
        console.log(response.data)
        // now we are getting the updated suggestion from the data, delete the suggestion where the id matches

        const updatedLectures = lectures.filter(lecture => lecture.id !== i);
        setLectures(updatedLectures);
        const message = response.data.message;
        if( message === "Lecture deleted successfully"){
            showToast('success', 'lecture is deleted');
        }


    }

    const allPressed = () => {
        console.log(props.isAll)
    }

    const visit = (id) => {
        console.log(`visit ${id} th lecture`)
        navigate(`/lecture/${id}`);
    }




    return (


        <div className='whole-thing-container'>
            <ToastContainer />

            <div className='suggestion-list-title-container'>
                <div className='suggestion-list-title'>
                    PAST LECTURES
                </div>
                {
                    props.isAll === false ? <div className='suggestion-see-all' onClick={() => allPressed()}>
                        See All
                    </div> : <></>
                }

                <div className='suggestion-title-buttons'>
                    <div className={`suggestion-title-button ${selected == 'all' ? 'selected' : ''}`} onClick={() => setSelected('all')}> All</div>

                    <div className={`suggestion-title-button ${selected == 'highlighted' ? 'selected' : ''}`} onClick={() => setSelected('highlighted')}> starred</div>
                </div>

            </div>

            <div className='suggestion-list-container' >
                {
                    lectures &&
                    lectures.map((lecture, index) => (
                        (selected === 'all' || (selected === 'highlighted' && lecture.isStarred == true)) 
                        && (props.isAll === true || (props.isAll === false && index < 7)) ?
                            <div className='suggestion-container'>
                                <div className='suggestion-text-container'>

                                    <div className='suggestion-name' onClick={()=>visit(lecture.id)}>
                                        {lecture.topic}
                                    </div>

                                    {/* <div className='suggestion-horizontal-line'>
                            </div> */}

                                    {/* <div className='suggestion-tag'>
                                        <div className='tag-icon'><FontAwesomeIcon icon={faTag} size='1x' /></div>

                                        <div className='suggestion-tag-text'>
                                            {suggestion.source}
                                        </div>

                                    </div> */}

                                </div>
                                <div className='suggestion-lower-part'>
                                    <ProgressBar percentage={(lecture.current_question -1)/lecture.total_questions*100} />

                                    {/* <div className='visition'>
                                        <div className={`visition-text ${suggestion.state > 2 ? 'visited' : ''}`}>
                                            {suggestion.state > 2 ? 'visited' : 'not visited'}
                                        </div>
                                    </div> */}


                                    <div className='suggestion-buttons'>
                                        <div className={`suggestion-button ${lecture.isStarred == true ? 'imp' : ''}`} onClick={() => makeImportant(lecture.id)}>
                                            <FontAwesomeIcon icon={faStar} size='1x' />
                                        </div>
                                        {/* <div className='suggestion-button' onClick={() => visit(suggestion.id, suggestion.link)}>
                                            <FontAwesomeIcon icon={faGlobe} size='1x' />
                                        </div> */}
                                        <div className='suggestion-button' onClick={() => deleteLecture(lecture.id)}>
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


export default LectureList;