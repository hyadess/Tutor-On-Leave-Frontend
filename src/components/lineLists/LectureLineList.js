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

const LectureLineList = ({ current }) => {

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

    const [lectures, setLectures] = useState([]);
    const { userId } = useAuth();
    //navigate
    const navigate = useNavigate();

    const myLectures = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/lecture/${userId}/get_all`);
            console.log(response);
            setLectures(response.data);
        }
        catch (error) {
            console.error('Error fetching convos:', error.response ? error.response.data : error.message);
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


    const openLecture = (index) => {
        //navigate to the convo
        navigate(`/lecture/${index}`);
    }
    const deleteLecture = async (i) => {
        console.log(`${i} th convo is deleted`)
        const response = await axios.delete(`http://127.0.0.1:8000/lecture/${i}/delete`);
        console.log(response.data)
        // now we are getting the updated suggestion from the data, delete the suggestion where the id matches

        const updatedLectures = lectures.filter(lecture => lecture.id !== i);
        setLectures(updatedLectures);
        const message = response.data.message;
        if (message === "Lecture deleted successfully") {
            showToast('success', 'conversation is deleted');
        }


    }



    useEffect(() => {
        myLectures();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className='convo-list-container'>
                {
                    lectures.length === 0 ? <div></div> :
                        lectures.map((lecture, index) => (
                            index > 5 || lecture.id == current ? <div></div> :
                                <div className='convo-list-convo'>
                                    <div className='convo-list-text'>
                                        {lecture.topic}
                                    </div>

                                    <div className='convo-list-button-container'>
                                        <div className='convo-list-button' onClick={() => deleteLecture(lecture.id)}>
                                            <FontAwesomeIcon icon={faFire} size='1x' />
                                        </div>
                                        <div className='convo-list-button' onClick={() => openLecture(lecture.id)}>
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

export default LectureLineList;