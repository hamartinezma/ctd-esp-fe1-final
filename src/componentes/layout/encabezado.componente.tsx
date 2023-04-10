import { Link } from "react-router-dom";
import './encabezado.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from "../../redux/store";

/**
 * Componente que representa el encabezado de la aplicación, que contiene los enlaces de navegación.
 */
const Encabezado = () => {
    const personajeSeleccionado = useSelector((state: AppState) => state.personajes.personajeSeleccionado);
    return (
        <header>
            <div>
                <div>
                    <h2>Examen Final de Frontend IV</h2>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/favoritos">Favoritos</Link></li>
                        <li><Link to={`/detalle/${personajeSeleccionado?.id}`}>Detalle</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Encabezado;