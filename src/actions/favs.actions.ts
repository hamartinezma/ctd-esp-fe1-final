import { Action, ActionCreator } from "@reduxjs/toolkit";
import Personaje from "../types/personaje.types";

interface FavoriteAction extends Action {
  type: "TOGGLE_FAVORITE";
  personaje: Personaje;
}

interface FavoriteRemoveAllAction extends Action {
  type: "REMOVE_ALL_FAVORITE";
}

export const toggleFavorite: ActionCreator<FavoriteAction> = (
  personaje: Personaje
) => ({
  type: "TOGGLE_FAVORITE",
  personaje,
});

export const removeAllFavorite: ActionCreator<
  FavoriteRemoveAllAction
> = () => ({
  type: "REMOVE_ALL_FAVORITE",
});

export type FavoriteActions =
  | ReturnType<typeof toggleFavorite>
  | ReturnType<typeof removeAllFavorite>;
