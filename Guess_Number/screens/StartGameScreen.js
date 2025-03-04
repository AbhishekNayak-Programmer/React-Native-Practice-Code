import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/UI/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/UI/Title";
import Card from "../components/UI/Card";
import InstructionText from "../components/UI/InstructionText";

const StartGameScreen = (props) => {
  const [enteredNum, setEnteredNum] = useState("");
  const { width, height } = useWindowDimensions();
  let marginTopDistance = height < 380 ? 30 : 100;

  const numberInputHandler = (entNum) => setEnteredNum(entNum);

  const confirmInputHandler = () => {
    const chosenNum = parseInt(enteredNum);
    if (isNaN(chosenNum) || enteredNum <= 0 || enteredNum > 99) {
      Alert.alert("Invalid Number", "Number has to be in between 1 and 99", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    props.onPickedNum(enteredNum);
  };

  const resetInputHandler = () => setEnteredNum("");

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title text="Guess My Number" />
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              maxLength={2}
              style={styles.numberInput}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNum}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton btnText="Reset" onPress={resetInputHandler} />
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  btnText="Confirm"
                  onPress={confirmInputHandler}
                />
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: 100,
    alignItems: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
  },

  buttonContainer: {
    flex: 1,
  },

  numberInput: {
    height: 50,
    width: 50,
    textAlign: "center",
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
  },
});
