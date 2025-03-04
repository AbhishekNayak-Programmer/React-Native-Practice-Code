import { Text, StyleSheet, Platform } from "react-native";

const Title = (props) => {
  return <Text style={styles.title}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    // borderWidth: Platform.OS === "ios" ? 2 : 0,
    borderWidth: Platform.select({ ios: 2, android: 0 }),
    borderColor: "white",
    padding: 12,
    maxWidth: "80%",
    width: 300,
  },
});

export default Title;
