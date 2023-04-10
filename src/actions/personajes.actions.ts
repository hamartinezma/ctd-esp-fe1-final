import { Action, ActionCreator, ThunkAction } from '@reduxjs/toolkit'
import { getCharactersAPI, changePage } from "../services/personaje.services";
import { RootState } from "../redux/store";
import Page from "../types/page.types";
import Personaje from "../types/personaje.types";

export const SET_LAST_VISITED = 'SET_LAST_VISITED';

interface SetLastVisitedAction extends Action {
  type: typeof SET_LAST_VISITED;
  payload: string;
}

export type ActionTypes = SetLastVisitedAction;

export const setLastVisited = (lastVisited: string) => {
  return {
    type: SET_LAST_VISITED,
    payload: lastVisited
  };
};

interface getCharactersAccion extends Action {
  type: "GET_CHARACTERS";
  query: string;
}
interface getCharactersSuccessAccion extends Action {
  type: "GET_CHARACTERS_SUCCESS";
  personajes: Personaje[];
  pageInfo: Page;
}
interface getCharactersErrorAccion extends Action {
  type: "GET_CHARACTERS_ERROR";
  error: string | number;
}

const getCharacters: ActionCreator<getCharactersAccion> = (query: string) => {
  return {
    type: "GET_CHARACTERS",
    query: query,
  };
};

const getCharactersSuccess: ActionCreator<getCharactersSuccessAccion> = (
  personajes: Personaje[],
  pageInfo: Page
) => {
  return {
    type: "GET_CHARACTERS_SUCCESS",
    personajes: personajes,
    pageInfo: pageInfo,
  };
};

const getCharactersError: ActionCreator<getCharactersErrorAccion> = (
  mensaje: string | number
) => {
  return {
    type: "GET_CHARACTERS_ERROR",
    error: mensaje,
  };
};

export type CharacterActions =
  | ReturnType<typeof getCharacters>
  | ReturnType<typeof getCharactersSuccess>
  | ReturnType<typeof getCharactersError>;

interface FetchCharactersThunkAction
  extends ThunkAction<void, RootState, unknown, CharacterActions> {}



  
export const fetchCharactersThunk = (
  query: string
): FetchCharactersThunkAction => {
  return async (dispatch, getState) => {
    dispatch(getCharacters(query));
    try {
      const response = await getCharactersAPI(query);
      const [personajes, info, status] = response;
      if (status === 200) {
        dispatch(getCharactersSuccess(personajes, info));
      } else {
        dispatch(getCharactersError(status));
      }
    } catch (e) {
      dispatch(getCharactersError(e));
    }
  };
};

export const changePageThunk = (url: string): FetchCharactersThunkAction => {
  return async (dispatch, getState) => {
    try {
      const [personajes, info] = await changePage(url);
      dispatch(getCharactersSuccess(personajes, info));
    } catch (e) {
      dispatch(getCharactersError(e));
    }
  };
};
