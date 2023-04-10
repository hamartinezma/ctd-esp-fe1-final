import React from "react";
import { TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector } from "react-redux";
import { changePageThunk } from "../../actions/personajes.actions";
import { AppDispatch, RootState } from "../../redux/store";
import "./paginacion.css";

/**
 * Componente que contiene los botones para paginar.
 * 
 * @returns {JSX.Element} Elemento de React que contiene los botones de paginación.
 */
const Paginacion = () => {
    const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
    const dispatch = useDispatch<any>();
    const pageInfo = useSelector((state) => state.personajes.pageInfo);
    const { next, prev } = pageInfo;

    /**
     * Función que se ejecuta cuando se hace clic en el botón "Anterior".
     * Despacha una acción para cambiar a la página anterior.
     */
    const previusPage = () => {
        dispatch(changePageThunk(prev));
    };

    /**
     * Función que se ejecuta cuando se hace clic en el botón "Siguiente".
     * Despacha una acción para cambiar a la siguiente página.
     */
    const nextPage = () => {
        dispatch(changePageThunk(next));
    };

    return (
        <div className="paginacion">
            <button onClick={previusPage} disabled={prev === null} className="primary">
                Anterior
            </button>
            <button onClick={nextPage} disabled={next === null} className="primary">
                Siguiente
            </button>
        </div>
    );
};

export default Paginacion;
