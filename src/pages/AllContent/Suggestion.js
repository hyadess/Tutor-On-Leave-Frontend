import axios from "axios";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import SuggestionList from "../../components/lists/SuggestionList";
import "../../css/All.css";
import { useNavigate } from 'react-router-dom';

const Suggestion = () => {

    const { userId } = useAuth();
    const navigate = useNavigate(); 
    const [suggestions, setSuggestions] = useState([]);

    const mySuggestions = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/suggestion/${userId}/get_all`);
            console.log(response);
            setSuggestions(response.data);
        }
        catch (error) {
            console.error('Error fetching suggestions:', error.response ? error.response.data : error.message);
        }
    }
    useEffect(() => {
        mySuggestions();
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
                <SuggestionList isAll={true} suggestions={suggestions} />

            </div>

        </>
    )
}

export default Suggestion;