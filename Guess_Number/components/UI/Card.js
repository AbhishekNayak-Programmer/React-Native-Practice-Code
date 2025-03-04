import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const Card = (props) => {
  return <View style={styles.inputContainer}>{props.children}</View>;
};

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: deviceWidth < 380 ? 18 : 36,
    padding: 16,
    backgroundColor: Colors.primary800,
    marginHorizontal: 24,
    borderRadius: 8,
    elevation: 4, // Used for giving box shadown in android

    // Used to add shadow in IOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
