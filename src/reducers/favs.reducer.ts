import { Reducer } from "@reduxjs/toolkit";
import { FavoriteActions } from "../actions/favs.actions";
import Personaje from "../types/personaje.types";

interface StateFavorites {
  favoritesMapa: Map<number, Personaje>;
}

const initialState: StateFavorites = {
  favoritesMapa: new Map(),
};

const favoritesReducer: Reducer<StateFavorites, FavoriteActions> = (
  state = initialState,
  action
): StateFavorites => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const map = new Map<number, Personaje>(state.favoritesMapa); // Copia el mapa original en uno nuevo
      const personajeId = action.personaje.id;

      if (map.has(personajeId)) {
        map.delete(personajeId);
      } else {
        map.set(personajeId, action.personaje);
      }

      return {
        ...state,
        favoritesMapa: map,
      };

    case "REMOVE_ALL_FAVORITE":
      return {
        ...initialState,
      };
    default:
      return { ...state };
  }
};

export default favoritesReducer;
