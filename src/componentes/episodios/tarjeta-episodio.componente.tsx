import './tarjeta-episodio.css';
import Episodio from "../../types/episodio.types";
import React from 'react';

/**
 * Tarjeta para mostrar los datos de cada episodio dentro de la vista de personaje.
 * 
 * @param {object} episodio - Los datos del episodio que se mostrarán en la tarjeta.
 * @param {string} episodio.name - El nombre del episodio.
 * @param {string} episodio.episodio - El número de episodio.
 * @param {string} episodio.air_date - La fecha de lanzamiento del episodio.
 * 
 * @returns Un elemento JSX que representa la tarjeta del episodio.
 */
const TarjetaEpisodio = ({ episodio }: { episodio: Episodio }) => {

    return <div className="tarjeta-episodio">
        <h4>{episodio.name}</h4>
        <div>
            <span>{episodio.episodio}</span>
            <span>Lanzado el: {episodio.air_date}</span>
        </div>
    </div>
}

export default TarjetaEpisodio;
