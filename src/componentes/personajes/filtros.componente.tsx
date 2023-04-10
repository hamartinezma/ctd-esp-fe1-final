import React, { ChangeEvent } from "react";
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector as useReduxSelector,
} from "react-redux";
import { fetchCharactersThunk } from "../../actions/personajes.actions";
import { AppDispatch, RootState } from "../../redux/store";
import "./filtros.css";

/**
 * Componente que contiene el input de filtro por nombre para buscar personajes.
Utiliza useSelector y useDispatch de react-redux para acceder al estado global y despachar acciones,
con el objetivo de cambiar la query de búsqueda y mostrar los resultados filtrados.
* @returns Un JSX element con un input y una etiqueta de filtro por nombre.
*/

const Filtros = () => {

    const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
    const query = useSelector((state) => state.personajes.query);
    const dispatch = useDispatch<any>();

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        let query = e.target.value;
        dispatch(fetchCharactersThunk(query));
    };


    return <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre" onChange={onChange}
            value={query}
            autoFocus={true} />
    </div>
}

export default Filtros;