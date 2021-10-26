import { StyleSheet } from "react-native";
import { FONTS } from "../../theme";

export const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 14,
    fontFamily: FONTS.BOLD,
    marginLeft: 12,
  },
  button: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
