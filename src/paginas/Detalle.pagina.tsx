import "./Detalle.css";
import { useLocation } from "react-router-dom";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import Episodio from "../types/episodio.types";
import { getEpisodesThunk } from "../actions/episodios.actions";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import Personaje from "../types/personaje.types";
import React from "react";

/**
 * Esta es la pagina de detalle. Aqui se puede mostrar la vista sobre el personaje seleccionado junto con la lista de episodios en los que aparece
 *
 * EL TRABAJO SOBRE ESTE ARCHIVO ES OPCIONAL Y NO ES REQUISITO DE APROBACION
 *
 *
 *
 * Uso:
 * ``` <PaginaDetalle /> ```
 *
 * @returns la pagina de detalle
 */
const PaginaDetalle = () => {

  const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
  const { episodios, status } = useSelector((state) => state.episodios);
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const state: any = location.state;
  const personaje: Personaje | undefined = state?.personaje;
  const personajeSeleccionado = useSelector((state: RootState) => state.personajes.personajeSeleccionado);

  const [arrayEpisodeID, setArrayEpisodeID] = useState<string[]>([]);

  useEffect(() => {
    if (!personaje || !personajeSeleccionado) {
      return;
    }
    if (!personaje.episode && personajeSeleccionado.episode) {
      personaje.episode = personajeSeleccionado.episode;
    }
    if (personaje.episode) {
      setArrayEpisodeID(
        personaje.episode.map((episodio: string) => episodio.split("/").at(-1) ?? "")
      );
    }
  }, [personaje, personajeSeleccionado]);

  useEffect(() => {
    if (arrayEpisodeID.length > 0) {
      dispatch(getEpisodesThunk(arrayEpisodeID));
    }
  }, [dispatch, arrayEpisodeID]);

  if (!personaje || !personajeSeleccionado) {
    return <div>Personaje no encontrado</div>;
  }

  return (
    <div className="container">
      <h3>{personajeSeleccionado.name || "Personaje no encontrado"}</h3>
      <div className={"detalle"}>
        <div className={"detalle-header"}>
          <img src={personaje?.image ?? personajeSeleccionado?.image} alt={personaje?.name ?? personajeSeleccionado?.name} />
          <div className={"detalle-header-texto"}>
            <p>{personaje?.name ?? personajeSeleccionado?.name}</p>
            <p>Planeta: {personaje?.origin.name ?? personajeSeleccionado?.origin.name}</p>
            <p>Genero: {personaje?.gender ?? personajeSeleccionado?.gender}</p>
          </div>
          <BotonFavorito personaje={personaje ?? personajeSeleccionado} />
        </div>
      </div>
      <h4>Lista de episodios donde apareció el personaje</h4>
      <div className={"episodios-grilla"}>
        {status === "LOADING" ? (
          <div>Cargando characters...</div>
        ) : status === "FAILED" ? (
          <div>No se pudo cargar los characters.</div>
        ) : !episodios ? (
          <></>
        ) : Array.isArray(episodios) ? (
          episodios.map((episodio: Episodio) => {
            return (
              <div key={`episodio_${episodio.id}_${personaje?.name ?? personajeSeleccionado?.name}`}><TarjetaEpisodio episodio={episodio} />
              </div>
            );
          })
        ) : (
          <TarjetaEpisodio episodio={episodios} />
        )}
      </div>
    </div>

  );
};

export default PaginaDetalle;