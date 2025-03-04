import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import Title from "../components/UI/Title";
import NumberContainer from "../components/Game/NumberContainer";
import PrimaryButton from "../components/UI/PrimaryButton";
import Card from "../components/UI/Card";
import InstructionText from "../components/UI/InstructionText";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/colors";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) return generateRandomBetween(min, max, exclude);
  else return rndNum;
};

let minBoundary = 0,
  maxBoundary = 100;

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <AntDesign name="minus" size={24} color="white" />
            </PrimaryButton>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("higher")}>
              <AntDesign name="plus" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <AntDesign name="minus" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("higher")}>
              <AntDesign name="plus" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userNumber) ||
      (direction === "higher" && currentGuess > props.userNumber)
    ) {
      Alert.alert("Dont' Lie", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") maxBoundary = currentGuess;
    else if (direction === "higher") minBoundary = currentGuess + 1;

    let randNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(randNum);
    setGuessRounds((prevArr) => [randNum, ...prevArr]);

    props.updateRounds();
  };

  useEffect(() => {
    if (currentGuess == props.userNumber) props.gameOverHandler();
  }, [currentGuess]);

  return (
    <View style={styles.screen}>
      <Title text="Opponent's Guess" />
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map((el, ind) => {
          return <Text key={ind}>{el}</Text>;
        })} */}
        <FlatList
          data={guessRounds}
          renderItem={(el) => (
            <View style={styles.listItem}>
              <Text>#{guessRounds.length - el.index}</Text>
              <Text>Opponent's Guess : {el.item}</Text>
            </View>
          )}
          keyExtractor={(el) => el}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },

  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },

  instructionText: {
    marginBottom: 12,
  },

  buttonContainer: {
    flex: 1,
  },
  listContainer: { flex: 1 },
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
  },
});

export default GameScreen;
