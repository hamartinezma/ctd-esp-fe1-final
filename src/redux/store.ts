import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import personajesReducer from "../reducers/personaje.reducer";
import favsReducer from "../reducers/favs.reducer";
import episodioReducer from "../reducers/episodios.reducer"
import Personaje from '../types/personaje.types';

/**
 * @author: alexander martinez
 */

// Define la interfaz para el estado global de la aplicación
export interface AppState {
  personajes: {
    personajeSeleccionado: Personaje;
  };
  // otros reducers aquí
}

export interface PersonajesState {
  personajes: Personaje[];
  personajeSeleccionado: Personaje | null;
  status: "IDLE" | "LOADING" | "SUCCEEDED" | "FAILED";
  error: string | null;
}

const rootReducer = combineReducers({
  personajes: personajesReducer,
  favs: favsReducer,
  episodios: episodioReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: () => any[]) => getDefaultMiddleware().concat(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
