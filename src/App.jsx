import { useState, useRef, useEffect } from 'react'
import './App.css';
import  RobotProfileImage from './assets/robot.png'
import UserProfileImage from './assets/user.png'
import LoadingSpinner from './assets/loading-spinner.gif'
import {Chatbot} from 'supersimpledev'
    function useAutoScroll(dependencies){
      const ref=useRef(null);
      useEffect(()=>{
       const containerElem=ref.current;
       containerElem.scrollTop=containerElem.scrollHeight;
      },[dependencies])
      return ref;
    }

    function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading }) {
      console.log('render ChatInput');
      const [inputText, setInputText] = useState('');

      function saveInputText(event) {
        setInputText(event.target.value);
      }

      async function sendMessage() {
        if (isLoading === 1) return;
        setInputText('');
        const newChatMessages = [
          ...chatMessages,
          {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID()
          }
        ];
        setChatMessages(newChatMessages);
        setChatMessages([
          ...newChatMessages,
          {
            message: <img className='loading-image' src={LoadingSpinner}></img>,
            sender: 'robot',
            id: crypto.randomUUID()
          }
        ]);
        setIsLoading(1);
        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
          ...newChatMessages,
          {
            message: response,
            sender: 'robot',
            id: crypto.randomUUID()
          }
        ]);
        setIsLoading(0);
      }


      return (
        <div className='chat-input-container'>
          <input
            className='chat-input'
            placeholder="Send a message to Chatbot"
            size="30"
            onChange={saveInputText}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && event.target.value !== '') {
                sendMessage();
              }
              if (event.key === 'Escape') {
                setInputText('');
              }

            }}
            value={inputText}
          />
          <button
            onClick={(event) => {
              if (event.target.value !== '') sendMessage();
            }}
            className="send-button"
          >
            Send
          </button>
        </div>
      );
    }
    function ChatMessage({ message, sender }) {
      //   console.log('render ChatMessage', message);

      return (
        <div
          className={
            sender === 'robot'
              ? 'chat-message-robot' :
              'chat-message-user'
          }
        >
          {sender === 'robot' && (
            <img src={RobotProfileImage} className="chat-message-profile" />
          )
          }
          <div className="chat-message-text">{message}</div>
          {sender === 'user' && (
            <img src={UserProfileImage} className="chat-message-profile"  />
          )
          }
        </div>
      );


    }
    function ChatMessages({ chatMessages }) {
      console.log('render ChatMessages');
      const chatMessagesRef=useAutoScroll(chatMessages);

      
      return  (
        <div 
        className="chat-messages-container"
        ref={chatMessagesRef}
        >

          {chatMessages.length!==0?chatMessages.map((chatMessage) => {
            return (
              <ChatMessage
                message={chatMessage.message}
                sender={chatMessage.sender}
                key={chatMessage.id}
              />
            );
          }):
          <div className="welcome-message">
            <p>Welcome to the chatbot project! Send a message using the textbox below.</p>
          </div>
          }
        </div>
      )
    }
  function App() {
      console.log('render App');
      const [chatMessages, setChatMessages] = useState([
      ]);
      const [isLoading, setIsLoading] = useState(0);



      return (
        <div className="app-container">
          <ChatMessages
            chatMessages={chatMessages}
          />
          <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      );
    
    }

export default App
