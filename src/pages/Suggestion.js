import axios from "axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import SuggestionList from "../components/lists/SuggestionList";


const Suggestion = ()=>{

    const { userId } = useAuth();
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

    return(
        <>
            <Navbar></Navbar>
            <SuggestionList isAll={true} suggestions={suggestions} />
        </>
    )
}

export default Suggestion;