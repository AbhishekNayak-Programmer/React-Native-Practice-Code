import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import MealMiniDetails from "./MealMiniDetails";

const MealItem = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.mealContainer}>
      <Pressable
        onPress={() =>
          navigation.navigate("MealsDetails", {
            MealId: props.id,
          })
        }
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
      >
        <View>
          <Image style={styles.image} source={{ uri: props.imageUrl }} />
          <Text style={styles.titleText}>{props.title}</Text>
        </View>
        <MealMiniDetails
          complexity={props.complexity}
          affordability={props.affordability}
          duration={props.duration}
        />
      </Pressable>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  mealContainer: {
    margin: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    margin: 8,
  },
  image: {
    width: "100%",
    height: 200,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
