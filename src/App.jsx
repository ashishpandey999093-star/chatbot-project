import { useState } from 'react'
import './App.css';
import{ChatMessages} from './components/ChatMessages'
import { ChatInput } from './components/ChatInput';
 

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
