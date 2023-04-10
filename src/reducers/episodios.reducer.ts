import { Reducer } from '@reduxjs/toolkit';
import { EpisodesActions } from "../actions/episodios.actions";
import Episodio from "../types/episodio.types";

interface EpisodesState {
  status: "IDLE" | "LOADING" | "COMPLETED" | "FAILED";
  episodios: Episodio | Episodio[];
  error: string | null;
}

const initialState: EpisodesState = {
  status: "IDLE",
  episodios: [],
  error: null,
};

const episodesReducer: Reducer<EpisodesState, EpisodesActions> = (
  state = initialState,
  action
): EpisodesState => {
  switch (action.type) {
    case "GET_EPISODES":
      return {
        ...state,
        status: "LOADING",
        episodios: [],
        error: null,
      };
    case "GET_EPISODES_SUCCESS":
      return {
        ...state,
        status: "COMPLETED",
        episodios: action.episodios,
      };
    case "GET_EPISODES_ERROR":
      return {
        ...state,
        status: "FAILED",
        error: action.error,
      };
    default:
      return { ...state };
  }
};

export default episodesReducer;
