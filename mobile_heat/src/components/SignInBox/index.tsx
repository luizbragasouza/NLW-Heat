import React from "react";

import { View } from "react-native";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { useAuth } from "../../hooks/auth";

import { styles } from "./styles";

export function SignInBox() {
  const { signIn, isSignIng } = useAuth();
  return (
    <View style={styles.container}>
      <Button
        title="ENTRAR COM GITHUB"
        icon="github"
        backgroundColor={COLORS.YELLOW}
        color={COLORS.BLACK_PRIMARY}
        onPress={signIn}
        isLoading={isSignIng}
      />
    </View>
  );
}
