import { Pressable, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const IconButton = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => (pressed ? styles.pressed : null)}
    >
      <Entypo name={props.icon} size={24} color={props.color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
    
  pressed: {
    opacity: 0.7,
  },
});
