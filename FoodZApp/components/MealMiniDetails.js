import { View, Text, StyleSheet } from "react-native";
const MealMiniDetails = (props) => {
  return (
    <View style={[styles.detailsContainer, props.defaultStyle]}>
      <Text style={[styles.detailItem, props.textStyle]}>
        {props.duration}m
      </Text>
      <Text style={[styles.detailItem, props.textStyle]}>
        {props.complexity.toUpperCase()}
      </Text>
      <Text style={[styles.detailItem, props.textStyle]}>
        {props.affordability.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});

export default MealMiniDetails;
