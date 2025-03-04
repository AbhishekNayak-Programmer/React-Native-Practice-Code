import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import MealsList from "../components/MealsList";
import { FavoriteContext } from "../context/FavoritesContext";
import { MEALS } from "../data/dummy-data";

const FavoriteScreen = () => {
  const favoriteContext = useContext(FavoriteContext);
  const favoriteMeals = MEALS.filter((meal) =>
    favoriteContext.favoritesMealId.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }
  return <MealsList items={favoriteMeals} />;
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
