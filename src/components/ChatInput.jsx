import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
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
        isLoading: 0,
        id: crypto.randomUUID()
      }
    ];
    setChatMessages(newChatMessages);
    setChatMessages([
      ...newChatMessages,
      {

        message: 'loading',
        sender: 'robot',
        isLoading: 1,
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
        isLoading: 0,
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
      <button
        onClick={() => {
           setChatMessages([]);
        }}
        className="clear-button"
      >
        Clear
      </button>
    </div>
  );
}