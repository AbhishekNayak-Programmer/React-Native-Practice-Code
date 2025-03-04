import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    favoritesMealId: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favoritesMealId.push(action.payload.id);
    },
    removeFavorite: (state, action) => {
      state.favoritesMealId.splice(
        state.favoritesMealId.indexOf(action.payload.id),
        1
      );
    },
  },
});

export const addFavorite = favoriteSlice.actions.addFavorite;
export const removeFavorite = favoriteSlice.actions.removeFavorite;
export default favoriteSlice.reducer;
