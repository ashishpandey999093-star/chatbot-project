 import UserProfileImage from '../assets/user.png'
 import RobotProfileImage from '../assets/robot.png'
 import './ChatMessage.css'
export    function ChatMessage({ message, sender }) {
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