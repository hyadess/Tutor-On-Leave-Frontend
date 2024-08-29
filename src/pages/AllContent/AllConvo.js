import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import ConvoList from "../../components/lists/ConvoList";
import "../../css/All.css"

const AllConvo = () => {


    const { userId } = useAuth();
    const [convos, setConvos] = useState([]);
    const myConvos = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/conversation/${userId}/get_normal`);
            console.log(response);
            setConvos(response.data);
        }
        catch (error) {
            console.error('Error fetching convos:', error.response ? error.response.data : error.message);
        }
    }




    useEffect(() => {
        myConvos();
    }, []);

    return (
        <>

            <Navbar></Navbar>
            <div className="all-container">
                <ConvoList isAll={false} convos={convos} />
            </div>


        </>
    )
}

export default AllConvo