import { Pressable, View, Text, StyleSheet } from "react-native";

const CategoryGridTile = (props) => {
  return (
    <View style={[styles.gridItem, { backgroundColor: `${props.color}` }]}>
      <Pressable
        onPress={props.onPress}
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <View
          style={[styles.innerContainer, { backgroundColor: `${props.color}` }]}
        >
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: "hidden",
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
