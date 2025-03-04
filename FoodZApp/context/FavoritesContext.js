import { createContext, useState } from "react";

export const FavoriteContext = createContext();

const FavoriteContextProvider = (props) => {
  const [favoritesMealId, setFavoritesMealId] = useState([]);

  const addFavoriteHandler = (id) => {
    setFavoritesMealId((prevMeals) => [...prevMeals, id]);
  };

  const removeFavoriteHandler = (id) => {
    setFavoritesMealId(favoritesMealId.filter((mealId) => mealId !== id));
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoritesMealId: favoritesMealId,
        addFavoriteHandler,
        removeFavoriteHandler,
      }}
    >
      {props.children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
