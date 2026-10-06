// Rutas de la API. Si el backend de un estudiante usa nombres distintos
// (ej. "/characters" en vez de "/personajes"), este es el único lugar
// que hay que tocar durante la defensa.
export const ENDPOINTS = {
  personajes: '/personajes',
  personajeConCard: (id) => `/personajes/${id}/con-card`,
  eventos: '/eventos',
  simularEvento: (id) => `/eventos/${id}/simular`,
};

async function manejarRespuesta(res) {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (res.status === 204) return null;
  return res.json();
}

export async function apiGet(apiBase, path) {
  const res = await fetch(apiBase + path);
  return manejarRespuesta(res);
}

export async function apiPost(apiBase, path, body) {
  const res = await fetch(apiBase + path, {
    method: 'POST',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  return manejarRespuesta(res);
}

// No todos los equipos van a nombrar el campo de imagen igual
// ("image", "imagenUrl", "imageUrl", "foto"...). Esta función prueba
// las variantes más comunes para que el frontend funcione sin ajustes
// manuales en la mayoría de los casos.
export function obtenerImagen(personaje) {
  if (!personaje) return '';
  return (
    personaje.image ||
    personaje.imagenUrl ||
    personaje.imageUrl ||
    personaje.foto ||
    personaje.avatar ||
    ''
  );
}

// Lo mismo para la facción: tolera que el backend la serialice como
// texto ("Rebelde") o como número de enum (0, 1, 2...).
export function obtenerFaccion(personaje) {
  if (!personaje) return '';
  const valor = personaje.faccion ?? personaje.facción ?? personaje.affiliation;
  return typeof valor === 'number' ? `facción #${valor}` : String(valor ?? '');
}
