import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";
import { api } from "../../services/api";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { IMessageResponse } from "../../interfaces/messages";
import Message from "./Message";

const messagesQueue: IMessageResponse[] = [];

const socket = io("http://localhost:4000");
socket.on("new_message", (newMessage: IMessageResponse) => {
  messagesQueue.push(newMessage);
});

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<IMessageResponse[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );

        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api.get<IMessageResponse[]>("/messages/last3").then((reponse) => {
      setMessages(reponse.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile" />
      <ul className={styles.messageList}>
        {messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </ul>
    </div>
  );
};

export default MessageList;
