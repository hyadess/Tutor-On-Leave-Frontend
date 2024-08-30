import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"
import LectureList from "../../components/lists/LectureList";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import QuizList from "../../components/lists/QuizList";
import "../../css/All.css"
import { useNavigate } from 'react-router-dom';
const AllQuiz = () => {


    const { userId } = useAuth();
    const navigate = useNavigate();
    const [quizes, setQuizes] = useState([]);
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
    useEffect(() => {
        myQuizes();

    }, []);
    useEffect(() => {
        if (!userId) {
            navigate('/');
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="all-container">
                <QuizList isAll={false} quizes={quizes} />
            </div>

        </>
    )
}

export default AllQuiz