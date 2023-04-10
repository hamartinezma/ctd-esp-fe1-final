
import React, { useEffect } from "react";
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector as useReduxSelector,
} from "react-redux";
import { fetchCharactersThunk } from "../../actions/personajes.actions";
import TarjetaPersonaje from './tarjeta-personaje.componente';
import './grilla-personajes.css';
import { AppDispatch, RootState } from "../../redux/store";


/**
* Componente que muestra una grilla de personajes.
* Se utiliza en la página principal y muestra una lista de TarjetaPersonaje para cada personaje.
@returns Un elemento SX que representa la grilla de personajes
*/

const GrillaPersonajes = () => {
    const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
    const { status, personajes } = useSelector((state) => state.personajes);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(fetchCharactersThunk(""));
    }, [dispatch]);


    if (status === "LOADING") return <div>Cargando personajes...</div>;
    if (status === "FAILED") return <div>No se pudo cargar los personajes.</div>;
    if (!personajes || personajes.length === 0) return <></>;

    return (
        <div className="grilla-personajes">
            {personajes.map((personaje) => {
                return (
                    <div key={personaje.id}>
                        <TarjetaPersonaje personaje={personaje} />
                    </div>
                );
            })}
        </div>
    );
}

export default GrillaPersonajes;