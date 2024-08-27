import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Chart from "react-apexcharts";
import Navbar from "../components/Navbar";

const Profile = ()=>{


    const { userId } = useAuth();
    const [user, setUser] = useState({})

    const [suggestions, setSuggestions] = useState()
    const [suggestTitle, setSuggestTitle] = useState([])
    const [suggestTime, setSuggestTime] = useState([])


    const [quizes, setQuizes] = useState()
    const [quizId, setQuizId] = useState([])
    const [quizPercentage, setQuizPercentage] = useState([])
    const [quiz,setQuiz] = useState()
    const [quizCount, setQuizCount] = useState([])
    const [quizTime, setQuizTime] = useState([])

    const [convo,setConvo] = useState()
    const [convoCount, setConvoCount] = useState([])
    const [convoTime, setConvoTime] = useState([])

    const myProfile = async () => {                                     
        try {

            const response = await axios.get(`http://127.0.0.1:8000/profile/${userId}`);
            console.log(typeof(response.data.quizzes[0].updated_at))
            
            setUser(response.data.user)
            setQuizes(response.data.quizzes)
            setQuiz(response.data.quiz)
            setSuggestions(response.data.suggestions)
            setConvo(response.data.convo)

        }
        catch (error) {

            console.error('Error fetching convos:', error.response ? error.response.data : error.message);

        }
    }

    useEffect(()=>{
        myProfile();
    },[])

    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        window.scrollTo(0, scrollPosition);
    }, [scrollPosition]);

    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (e) => {
        e.preventDefault()
        setScrollPosition(window.scrollY);
        setSelectedOption(e.target.value);
    };


    useEffect(()=>{

        if(quizes){

            let quizId = quizes.map(quiz => (quiz.updated_at)) 
            setQuizId(quizId)

            let quizPercent = quizes.map(quiz => ((quiz.score/quiz.total_questions) * 100).toFixed(2)) 
            setQuizPercentage(quizPercent)

        }
        if(suggestions){

            let suggestionPlaceholder = suggestions.map(suggest => suggest.count) 
            setSuggestTitle(suggestionPlaceholder)

            let suggestionDate = suggestions.map(suggest => suggest.date) 
            setSuggestTime(suggestionDate)
              
        }
        if(convo){

            let convoPlaceholder = convo.map(suggest => suggest.count) 
            setConvoCount(convoPlaceholder)

            let convoDate = convo.map(suggest => suggest.date) 
            setConvoTime(convoDate)
              
        }
        if(quiz){

            let convoPlaceholder = quiz.map(suggest => suggest.count) 
            setQuizCount(convoPlaceholder)

            let convoDate = quiz.map(suggest => suggest.date) 
            setQuizTime(convoDate)
              
        }

    },[quizes,suggestions,convo,quiz])

    const info = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            type: 'datetime',
            categories: quizId,
           
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left'
          },
          title: {
            text: 'Attempted Quiz mark in %',
            align: 'left',
            offsetX: 14
          },
          fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100]
              },
          },
          yaxis: {
            labels: {
                style: {
                    colors: '#8e8da4',
                },
                offsetX: 0,
                formatter: function(val) {
                  return (val).toFixed(2);
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            }
          },
        },
        series: [
                {
                    name: "Percentage",
                    data: quizPercentage,
                }
            ]
    };
    const quizInfo = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            type: 'datetime',
            categories: quizTime,
           
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left'
          },
          title: {
            text: 'Quiz count per second',
            align: 'left',
            offsetX: 14
          },
          fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100]
              },
          },
          yaxis: {
            labels: {
                style: {
                    colors: '#8e8da4',
                },
                offsetX: 0,
                formatter: function(val) {
                  return (val).toFixed(2);
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            }
          },
        },
        series: [
                {
                    name: "Count",
                    data: quizCount,
                }
            ]
    };
    const suggestInfo = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            type: 'datetime',
            categories: suggestTime,
           
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left'
          },
          title: {
            text: 'Suggestion count per day',
            align: 'left',
            offsetX: 14
          },
          fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100]
              },
          },
          yaxis: {
            labels: {
                style: {
                    colors: '#8e8da4',
                },
                offsetX: 0,
                formatter: function(val) {
                  return (val).toFixed(2);
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            }
          },
        },
        series: [
                {
                    name: "Count",
                    data: suggestTitle,
                }
            ]
    };
    const convoInfo = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            type: 'datetime',
            categories: convoTime,
           
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left'
          },
          title: {
            text: 'Convo count per second',
            align: 'left',
            offsetX: 14
          },
          fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100]
              },
          },
          yaxis: {
            labels: {
                style: {
                    colors: '#8e8da4',
                },
                offsetX: 0,
                formatter: function(val) {
                  return (val).toFixed(2);
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            }
          },
        },
        series: [
                {
                    name: "Count",
                    data: convoCount,
                }
            ]
    };

    const circleStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: 'blue',
    };

    
    return(
        <>
    
            <Navbar/>

            <div className="flex justify-center">

                <div className="w-[80%] md:w-[100%]">

                    <div className="user border-red-100 m-6 w-[100%] flex justify-center">
                        <div>
                            <div style={circleStyle}></div>
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <div className="m-6 w-[100%] grid grid-cols-1 md:grid-cols-2">

                        <div className="w-[90%] ">

                            <Chart
                                options={info.options}
                                series={info.series}
                                type="area"
                                width="100%"
                            />
                        </div>

                        <div className="w-[90%] ">
                            <select value={selectedOption} onChange={handleSelectChange}>
                                <option value="" disabled>Select an option</option>
                                <option value="Quiz">Quiz</option>
                                <option value="Suggestion">Suggestion</option>
                                <option value="Conversation">Conversation</option>
                            </select>
                        
                            
                            {selectedOption=="Quiz" && 
                                <Chart
                                    options={quizInfo.options}
                                    series={quizInfo.series}
                                    type="area"
                                    width="100%"
                                />
                            }
                            {selectedOption=="Suggestion" && 
                                <Chart
                                    options={suggestInfo.options}
                                    series={suggestInfo.series}
                                    type="area"
                                    width="100%"
                                />
                            }
                            {selectedOption=="Conversation" && 
                                <Chart
                                    options={convoInfo.options}
                                    series={convoInfo.series}
                                    type="area"
                                    width="100%"
                                />
                            }
                        </div>
                        
                    </div>

                </div>

            </div>
            

        </>
    )
}

export default Profile