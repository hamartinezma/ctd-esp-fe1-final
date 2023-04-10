import React from 'react';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { removeAllFavorite } from "../actions/favs.actions";
import TarjetaPersonaje from "../componentes/personajes/tarjeta-personaje.componente";
/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 * 
 * Uso: 
 * ``` <PaginaFavoritos /> ```
 * 
 * @returns la pagina de favoritos
 */

const PaginaFavoritos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
  const favoriteMap = useSelector((state) => state.favs.favoritesMapa);

  return <div className="container">
    <div className="actions">
      <h3>Personajes Favoritos</h3>
      <button className="danger" onClick={() => dispatch(removeAllFavorite())}>Eliminar</button>
    </div>

    {favoriteMap.size === 0 ? (
      <>No hay favoritos</>
    ) : (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridGap: "20px",
          justifyItems: "center",
        }}
      >
        {Array.from(favoriteMap.values()).map((personaje, index) => {
          return (
            <div key={personaje.id}>
              <TarjetaPersonaje personaje={personaje} />
            </div>
          );
        })}
      </div>
    )}

  </div>
}

export default PaginaFavoritos