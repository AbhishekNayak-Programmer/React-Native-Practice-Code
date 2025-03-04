import { Pressable, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const IconButton = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => (pressed ? styles.pressed : null)}
    >
      <View style={styles.buttonContainer}>
        <Entypo name={props.icon} size={props.size} color={props.color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
