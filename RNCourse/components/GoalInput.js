import { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  TextInput,
  Modal,
  Image,
} from "react-native";

const GoalInput = (props) => {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const goalInputHandler = (enteredText) => setEnteredGoalText(enteredText);

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
        <TextInput
          value={enteredGoalText}
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonStyle}>
            <Button
              color="#5e0acc"
              title="Add Goal"
              onPress={() => {
                props.addGoalHandler(enteredGoalText);
                setEnteredGoalText("");
              }}
            />
          </View>

          <View style={styles.buttonStyle}>
            <Button
              color="#f31282"
              title="Cancel"
              onPress={() => {
                props.closeModal();
                setEnteredGoalText("");
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 8,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 24,
  },
  buttonStyle: { width: 100, marginHorizontal: 8 },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});

export default GoalInput;
