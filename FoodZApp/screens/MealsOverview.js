import { MEALS, CATEGORIES } from "../data/dummy-data";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList";

const MealsOverview = (props) => {
  const catId = props.route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    props.navigation.setOptions({ title: categoryTitle });
  }, [catId, props.navigation]);

  return <MealsList items={displayedMeals} />;
};

export default MealsOverview;
