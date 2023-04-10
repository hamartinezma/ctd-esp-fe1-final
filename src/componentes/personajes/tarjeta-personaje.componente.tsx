import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Agregamos esta línea
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import React from "react";
import Personaje from "../../types/personaje.types";
import { setLastVisited } from "../../actions/personajes.actions"; // Importamos la acción

/**
 * Componente que representa una tarjeta con información básica de un personaje y una imagen.
 * @param {Object} props - Las propiedades del componente
 * @param {Personaje} props.personaje - El objeto del personaje con sus datos
 * @returns {JSX.Element} - Un elemento JSX que representa una tarjeta de personaje
 */

const TarjetaPersonaje = ({ personaje }: { personaje: Personaje }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch(); // Creamos la variable dispatch
    const redirectToDetailPage = () => {
        navigate(`/detalle/${personaje.id}`, { state: { personaje: personaje } });
        //dispatch(setLastVisited(personaje.id)); 
        dispatch(setLastVisited(`/detalle/${personaje.id}`.toString()));// Despachamos la acción con el id del personaje
    };

    return (
        <div className="tarjeta-personaje">
            <img
                src={personaje.image}
                onClick={redirectToDetailPage}
                alt={personaje.name}
            />
            <div className="tarjeta-personaje-body">
                <span>{personaje.name}</span>
                <BotonFavorito personaje={personaje} />
            </div>
        </div>
    );
};

export default TarjetaPersonaje;
