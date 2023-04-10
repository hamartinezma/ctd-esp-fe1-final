import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useDispatch } from "react-redux";
import { fetchCharactersThunk } from '../actions/personajes.actions';
import React from "react";

/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
 */

const PaginaInicio = () => {
  const dispatch = useDispatch<any>();

  const fetchCharacters = fetchCharactersThunk('');


  const borrarFiltros = () => {
    dispatch(fetchCharacters);
  };
  return <div className="container">
    <div className="actions">
      <h3>Catálogo de Personajes</h3>
      <button className="danger" onClick={borrarFiltros}>
        Limpiar filtros</button>
    </div>
    <Filtros />
    <Paginacion />
    <GrillaPersonajes />
    <Paginacion />
  </div>
}

export default PaginaInicio
