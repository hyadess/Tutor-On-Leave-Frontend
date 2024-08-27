// src/components/Dashboard.js
import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faPlus, faSquarePlus, faHouse } from '@fortawesome/free-solid-svg-icons';
import '../css/Convo.css';
import axios from 'axios';
import ConvoLineList from '../components/lineLists/ConvoLineList';
const Convo = () => {
  const { logout } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const [isLeftContracted, setIsLeftContracted] = useState(false);

  const handleLeftToggle = () => {
    setIsLeftContracted(!isLeftContracted);
  };

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [needanswer, setNeedanswer] = useState(0);
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);



  // user asks question...............................................................................................

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      if (needanswer === 1)
        return;
      setNeedanswer(1);
      setMessages([...messages, { text: newMessage, type: 'text', sender: 'user' }]);
      setCurrentQuestion(newMessage);
      setNewMessage('');
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };


  // backend query...............................................................................................

  const queryBackend = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/test/query`, {
        conversation_id: id,
        question: currentQuestion,
        prompt: 'answer the query'
      });
      //console.log(response.data);
      let newMessages = messages;
      response.data.messages.forEach((i) => {
        newMessages = [...newMessages, {
          text: i.message,
          type: i.message_type,
          sender: 'system'
        }];
      });
      setMessages(newMessages);

      console.log(messages);
    }
    catch (error) {
      console.error('Error querying backend:', error.response ? error.response.data : error.message);

    }

  }


  useEffect(() => {

    if (needanswer === 1) {
      queryBackend();
      setNeedanswer(0);
      setCurrentQuestion('');
    }

  }, [messages]);



  // at start...............................................................................................

  const loadConversation = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/conversation/${id}/show`);
      let newMessages = [];
      response.data.turns.forEach((i) => {
        let sender = i.turn.sender;
        i.messages.forEach((j) => {

          newMessages = [...newMessages, {
            text: j.message,
            type: j.message_type,
            sender: sender
          }];
        });

      });
      setMessages(newMessages);
      console.log(messages);

    }
    catch (error) {
      console.error('Error loading conversation:', error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    loadConversation();
  }, []);

  const parseResponse = (text, sender) => {
    const parts = text.split(/(```[\s\S]*?```)/);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        return (
          <pre key={index} className="code-block">
            <code>{part.slice(3, -3)}</code>
          </pre>
        );
      }
      return <div>{part}</div>;
    });
  };




  return (
    <div className="container">
      <div className={`left ${isLeftContracted ? 'contracted' : ''}`}>
        <div>
          <button className='menu-button' onClick={handleLeftToggle}><FontAwesomeIcon icon={faBars} size='2x' /></button>
        </div>
        <div className='new-convo'>
          <h3 className={`new-convo-text ${isLeftContracted ? 'contracted' : ''}`}>New Conversation</h3>
          <button className='menu-button add-button'><FontAwesomeIcon icon={faSquarePlus} size='3x' /></button>
        </div>

        <div className={`${isLeftContracted ? 'convo-list-contracted' : ''}`}>
          <ConvoLineList />
        </div>



        <div className='new-convo last'>
          {/* <h3 className={`new-convo-text ${isLeftContracted ? 'contracted' : ''}`}>Back-to home</h3> */}
          <button className='menu-button home-button'><FontAwesomeIcon icon={faHouse} size='2x' /></button>
        </div>


      </div>



      <div className={`middle ${isLeftContracted ? 'contracted' : ''}`}>
        <div className={`chat-container ${isLeftContracted ? 'contracted' : ''}`} ref={messageListRef}>
          {messages.map((message, index) => (
            message.type === 'text' ?

              <div className={`chat-message ${message.sender}`}>{parseResponse(message.text, message.sender)}</div>
              : <img src={message.text} alt='image' className={`chat-message ${message.sender}`} />
          ))}
        </div>
        <div className={`input-container ${isLeftContracted ? 'contracted' : ''}`}>

          <textarea
            type="text"
            className='chat-input'

            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />


          <button className='send-button' onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane} size='3x' /></button>


        </div>
      </div>


    </div>
  );
};

export default Convo;