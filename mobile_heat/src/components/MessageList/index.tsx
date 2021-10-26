import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { api } from "../../services/api";
import { io } from "socket.io-client";
import { IMessage, Message } from "../Message";
import { styles } from "./styles";

let messagesQueue: IMessage[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on("new_message", (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages((prevState) => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ]);
        messagesQueue.shift();
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function getMessages() {
      const messagesResponse = await api.get<IMessage[]>("/messages/last3");
      setCurrentMessages(messagesResponse.data);
    }

    getMessages();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message) => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  );
}
