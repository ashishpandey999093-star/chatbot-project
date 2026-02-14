import { useAutoScroll } from '../utility/useAutoScroll';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'

export  function ChatMessages({ chatMessages }) {
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