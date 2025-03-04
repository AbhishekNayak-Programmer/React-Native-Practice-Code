import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealMiniDetails from "../components/MealMiniDetails";
import { useLayoutEffect, useContext } from "react";
import IconButton from "../components/IconButton";
import { FavoriteContext } from "../context/FavoritesContext";

const MealDetails = (props) => {
  const mealId = props.route.params.MealId;
  const meal = MEALS.find((el) => el.id === mealId);
  const favoriteContext = useContext(FavoriteContext);
  const mealIsFavorite = favoriteContext.favoritesMealId.includes(mealId);

  const changeFavoriteStatusHandler = () => {
    if (mealIsFavorite) {
      // console.log("removing meal", mealId);
      favoriteContext.removeFavoriteHandler(mealId);
    } else {
      // console.log("adding meal", mealId);
      favoriteContext.addFavoriteHandler(mealId);
    }
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outlined"}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [props.navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.mealDetailContainer}>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{meal.title}</Text>

      <MealMiniDetails
        complexity={meal.complexity}
        affordability={meal.affordability}
        duration={meal.duration}
        textStyle={styles.textStyle}
      />

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Ingredients</Text>
          </View>
          {meal.ingredients.map((ing, key) => {
            return (
              <View style={styles.listItem} key={key}>
                <Text style={styles.itemText}>{ing}</Text>
              </View>
            );
          })}

          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Steps</Text>
          </View>
          {meal.steps.map((step, key) => {
            return (
              <View style={styles.listItem} key={key}>
                <Text style={styles.itemText}>{step}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetails;

const styles = StyleSheet.create({
  mealDetailContainer: {
    marginBottom: 32,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    margin: 8,
  },
  image: {
    width: "100%",
    height: 350,
  },
  textStyle: {
    color: "#fff",
  },
  subtitle: {
    color: "#e2b497",
    fontSize: 18,
    fontWeight: "bold",
    margin: 6,
    textAlign: "center",
  },
  subtitleContainer: {
    padding: 6,
    marginVertical: 4,
    borderBottomColor: "#e2b497",
    borderBottomWidth: 2,
    marginHorizontal: 12,
  },
  listOuterContainer: { alignItems: "center" },
  listContainer: {
    width: "80%",
  },
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },
});
