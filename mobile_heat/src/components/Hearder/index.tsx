import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { UserPhoto } from "../UserPhoto";
import LogoSgv from "../../assets/logo.svg";
import { styles } from "./styles";
import { useAuth } from "../../hooks/auth";

export function Hearder() {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <LogoSgv />
      {user && (
        <View style={styles.logoutButton}>
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
          <UserPhoto imageUri={user?.avatar_url} />
        </View>
      )}
    </View>
  );
}
