import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Title from "../components/UI/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/UI/PrimaryButton";

const GameOverScreen = (props) => {
  const { width, height } = useWindowDimensions();
  let imageSize = 300;
  if (width < 380) imageSize = 150;
  if (height < 400) imageSize = 80;

  const imageStyles = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title text="Game is Over!" />
        <View style={[styles.imageContainer, imageStyles]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed{" "}
          <Text style={styles.highlightText}>{props.rounds}</Text> Rounds to
          guess the User Number{" "}
          <Text style={styles.highlightText}>{props.userNum}</Text>
        </Text>

        <PrimaryButton btnText="Start New Game" onPress={props.restart} />
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlightText: {
    color: Colors.primary500,
    fontWeight: "bold",
  },
});
