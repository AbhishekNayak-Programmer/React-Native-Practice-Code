import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");
  const authContext = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `https://react-native-authenticat-a49c4-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=${authContext.token}`
      )
      .then((res) => {
        setFetchedMessage(res.data);
      });
  }, [authContext.token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
