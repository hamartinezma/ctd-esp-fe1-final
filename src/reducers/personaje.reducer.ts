import { Reducer } from "@reduxjs/toolkit";
import { CharacterActions } from "../actions/personajes.actions";
import Page from "../types/page.types";
import Personaje from "../types/personaje.types";

interface PersonajesState {
  personajeSeleccionado: any;
  status: "IDLE" | "LOADING" | "COMPLETED" | "FAILED";
  personajes: Personaje[];
  query: string;
  pageInfo: Page;
  error: string | number | null;
}

const initialState: PersonajesState = {
  status: "IDLE",
  personajes: [],
  query: "",
  pageInfo: { count: 0, pages: 0, next: "", prev: "" },
  error: null,
  personajeSeleccionado: [],
};

const charactersReducer: Reducer<PersonajesState, CharacterActions> = (
  state = initialState,
  action
): PersonajesState => {
  switch (action.type) {
    case "GET_CHARACTERS":
      return {
        ...initialState,
        status: "LOADING",
        query: action.query,
      };
    case "GET_CHARACTERS_SUCCESS":
      return {
        ...state,
        status: "COMPLETED",
        personajes: action.personajes,
        pageInfo: action.pageInfo,
      };
    case "GET_CHARACTERS_ERROR":
      return {
        ...state,
        status: "FAILED",
        personajes: [],
        error: action.error,
      };
    default:
      return { ...state };
  }
};

export default charactersReducer;
