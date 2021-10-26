import styles from "./styles.module.scss";
import { IMessageResponse } from "../../../interfaces/messages";

interface IMessageProps {
  message: IMessageResponse;
}

const Message: React.FC<IMessageProps> = ({ message }) => {
  return (
    <li className={styles.message}>
      <p className={styles.messageContent}>{message.text}</p>
      <div className={styles.messageUser}>
        <div className={styles.userImage}>
          <img src={message.user.avatar_url} alt={message.user.name} />
        </div>
        <span>{message.user.name}</span>
      </div>
    </li>
  );
};

export default Message;
