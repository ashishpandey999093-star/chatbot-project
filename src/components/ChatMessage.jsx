import dayjs from 'dayjs';
import UserProfileImage from '../assets/user-profile.jpg'
import RobotProfileImage from '../assets/robot.png'
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatMessage.css'

export function ChatMessage({ message, sender, isLoading }) {
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
      <div className="chat-message-text">
        {isLoading ? <img src={LoadingSpinner} className="loading-image" /> : message}

        <div className="time">{dayjs().format('h:mma')}</div>

      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )
      }
    </div>
  );


}