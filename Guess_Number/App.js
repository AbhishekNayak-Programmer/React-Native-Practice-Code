import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import Colors from "./constants/colors";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { StatusBar } from "expo-status-bar";
// import { useFonts } from "expo-font";

export default function App() {
  // Using custom fonts
  // const [fontsLoaded] = useFonts({
  //   "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  //   "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  // });

  const [userNum, setUserNum] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [rounds, setRounds] = useState(1);
  const pickedNumHandler = (pickedNum) => setUserNum(pickedNum);

  const restartGameHandler = () => {
    setUserNum(null);
    setGameIsOver(false);
    setRounds(1);
  };

  const updateRounds = () => setRounds((prev) => prev + 1);

  let screen = <StartGameScreen onPickedNum={pickedNumHandler} />;
  if (userNum) {
    screen = (
      <GameScreen
        userNumber={userNum}
        gameOverHandler={() => setGameIsOver(true)}
        updateRounds={updateRounds}
      />
    );
  }

  if (gameIsOver && userNum)
    screen = (
      <GameOverScreen
        restart={restartGameHandler}
        rounds={rounds}
        userNum={userNum}
      />
    );

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.mainContainer}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.mainContainer}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.mainContainer}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
