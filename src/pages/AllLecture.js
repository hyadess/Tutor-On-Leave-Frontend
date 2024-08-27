import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import LectureList from "../components/lists/LectureList";
import { useAuth } from "../context/AuthContext";
import axios from "axios";


const AllLecture = ()=>{


    const { userId } = useAuth();
    const [lectures, setLectures] = useState([]);
    const myLectures = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/lecture/${userId}/get_all`);
            console.log(response);
            setLectures(response.data);
        }
        catch (error) {
            console.error('Error fetching lectures:', error.response ? error.response.data : error.message);
        }
    }
    useEffect(() => {
        myLectures();
        
    }, []);

    return(
        <>
            <Navbar></Navbar>
            <LectureList isAll={true} lectures={lectures} />
        </>
    )
}

export default AllLecture