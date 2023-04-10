import React from "react";
import { RootState } from "../../redux/store";
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector as useReduxSelector,
} from "react-redux";
import './boton-favorito.css';
import Personaje from "../../types/personaje.types";
import { toggleFavorite } from "../../actions/favs.actions";

/**
* Componente que muestra un botón que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
* @param {Personaje} personaje - El personaje al que se aplica el botón
* @returns Un elemento TSSX que muestra el botón de favorito.
*/

const BotonFavorito = ({ personaje }: { personaje: Personaje }) => {
    const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
    const favoriteMap = useSelector((state) => state.favs.favoritesMapa);
    const dispatch = useDispatch();

    const src = require(favoriteMap.has(personaje.id)
        ? "../../imagenes/star-filled.png"
        : "../../imagenes/star.png");

    const toggleFavorites = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        dispatch(toggleFavorite(personaje));
    };

    return (
        <div className="boton-favorito" onClick={toggleFavorites}>
            <img src={src} alt="Favorito" />
        </div>

    );
};

export default BotonFavorito;