import { Action, ActionCreator, ThunkAction } from "@reduxjs/toolkit";
import { fetchEpisodes } from "../services/personaje.services";
import { RootState } from "../redux/store";
import Episodio from "../types/episodio.types";

interface getEpisodesAccion extends Action {
  type: "GET_EPISODES";
  query: string;
}
interface getEpisodesSuccessAccion extends Action {
  type: "GET_EPISODES_SUCCESS";
  episodios: Episodio | Episodio[];
}
interface getEpisodesErrorAccion extends Action {
  type: "GET_EPISODES_ERROR";
  error: string;
}

const getEpisodes: ActionCreator<getEpisodesAccion> = (query: string) => {
  return {
    type: "GET_EPISODES",
    query: query,
  };
};

const getEpisodesSuccess: ActionCreator<getEpisodesSuccessAccion> = (
  episodios: Episodio | Episodio[]
) => {
  return {
    type: "GET_EPISODES_SUCCESS",
    episodios: episodios,
  };
};

const getEpisodesError: ActionCreator<getEpisodesErrorAccion> = (
  mensaje: string
) => {
  return {
    type: "GET_EPISODES_ERROR",
    error: mensaje,
  };
};

export type EpisodesActions =
  | ReturnType<typeof getEpisodes>
  | ReturnType<typeof getEpisodesSuccess>
  | ReturnType<typeof getEpisodesError>;

interface FetchEpisodesThunkAction
  extends ThunkAction<void, RootState, unknown, EpisodesActions> {}

  export const getEpisodesThunk = (
    arrayEpisodeID: (string | undefined)[]
  ): FetchEpisodesThunkAction => {
    return async (dispatch, getState) => {
      try {
        const response = await fetchEpisodes(arrayEpisodeID);
        if (response !== undefined) {
          dispatch(getEpisodesSuccess(response));
        }
      } catch (e) {
        dispatch(getEpisodesError(e));
      }
    };
  };