import { useState,useEffect } from 'react'
import './App.css';
import{ChatMessages} from './components/ChatMessages'
import { ChatInput } from './components/ChatInput';
import {Chatbot} from 'supersimpledev/'
 

 function App() {
      
      console.log('render App');
      const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')));
      const [isLoading, setIsLoading] = useState(0);

      useEffect(()=>{
       Chatbot.addResponses({
        'Hi':'Hello! How can I help you?',
        'hi':'Hello! How can I help you?',
        'How are you':'I am totally fine'
       })
      },[]);

      useEffect(()=>{
       localStorage.setItem('messages',JSON.stringify(chatMessages));
       console.log('localStorage updated');
      },[chatMessages]);

 


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
