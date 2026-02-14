 import { useState } from 'react';
 import { Chatbot } from 'supersimpledev';
 import LoadingSpinner from '../assets/loading-spinner.gif';
 import './ChatInput.css';

 
export function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading }) {
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