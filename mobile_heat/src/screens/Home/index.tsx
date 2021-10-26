import React from "react";
import { View, Text } from "react-native";
import { MessageList } from "../../components/MessageList";
import { Hearder } from "../../components/Hearder";
import { styles } from "./styles";
import { SignInBox } from "../../components/SignInBox";
import { SendMessageForm } from "../../components/SendMessageForm";
import { useAuth } from "../../hooks/auth";

export function Home() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Hearder />
      <MessageList />
      {user ? <SendMessageForm /> : <SignInBox />}
    </View>
  );
}
