import Episodio from "../types/episodio.types";
import Page from "../types/page.types";
import Personaje from "../types/personaje.types";
/**
 * Función que devuelve todos los personajes por página y permite filtrar por el nombre
 * @param {string | undefined} name - El nombre del personaje por el cual filtrar (opcional).
 * @returns {Promise<[Personaje[], Page, number] | [any, any, number]>} Una matriz que contiene la lista de personajes, información de paginación y estado de respuesta, o un mensaje de error si la solicitud falla.
 */
export const getCharactersAPI = async (
  name?: string
): Promise<[Personaje[], Page, number] | [any, any, number]> => {
  let nameParam = "";
  if (name !== "" && name !== undefined) {
    if (name.includes(" ")) {
      const names = name.split(" ");
      nameParam = `name=${names[0]}%20${names[1]}`;
    } else {
      nameParam = `name=${name}`;
    }
  }
  return fetch(`https://rickandmortyapi.com/api/character?${nameParam}`).then(
    async function (response) {
      const data = await response.json();
      return [data.results, data.info, response.status];
    }
  );
};

/**
* Función que devuelve los personajes por página.
* @param {string }url
* @returns {Promise<[Personaje[], Page]>} Una matriz que contiene la lista de personajes y su información de paginación.
*/
export const changePage = async (
  url: string
): Promise<[Personaje[], Page]> => {
  return fetch(url)
    .then((data) => data.json())
    .then((data) => [data.results, data.info]);
};

/**
* Función que devuelve todos los episodios de un personaje.
* @param {Array<number>} arrayEpisodeID
* @returns {Promise<Episodio | Episodio[]>} Retorna todos los episodios de un personaje.
*/
export const fetchEpisodes = async (
  arrayEpisodeID: (string | undefined)[]
): Promise<Episodio | Episodio[]> => {
  return (
    await fetch(`https://rickandmortyapi.com/api/episode/${arrayEpisodeID}`)
  ).json();
};
