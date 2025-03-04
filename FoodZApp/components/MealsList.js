import { FlatList, View, StyleSheet } from "react-native";
import MealItem from "./MealItem";

const MealsList = (props) => {
  const renderMealItem = (itemData) => {
    return <MealItem {...itemData.item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.items}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
