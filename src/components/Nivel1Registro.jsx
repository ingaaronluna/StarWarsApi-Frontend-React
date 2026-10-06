import { obtenerImagen, obtenerFaccion } from '../api.js';

function claseFaccion(faccion) {
  const f = faccion.toLowerCase();
  if (f.includes('rebel')) return 'rebelde';
  if (f.includes('imperio') || f.includes('empire')) return 'imperio';
  if (f.includes('sith')) return 'sith';
  if (f.includes('jedi')) return 'jedi';
  return '';
}

export default function Nivel1Registro({ personajes, seleccionadoId, onSeleccionar }) {
  return (
    <section className="nivel">
      <div className="nivel-head">
        <span className="nivel-index">NIVEL 01</span>
        <h2>Registro de personajes</h2>
      </div>
      <p className="nivel-endpoint">GET /personajes</p>
      <p className="nivel-desc">
        El endpoint más simple del sistema: trae la lista completa sin procesar nada.
        Selecciona un personaje para abrir su ficha de combate en el Nivel 02.
      </p>

      {personajes.length === 0 ? (
        <p className="placeholder">Conéctate a la API para cargar el registro.</p>
      ) : (
        <div className="grid-personajes">
          {personajes.map((p) => {
            const faccion = obtenerFaccion(p);
            return (
              <div
                key={p.id}
                className={`ficha-mini ${p.id === seleccionadoId ? 'activa' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`Ver ficha de ${p.nombre}`}
                onClick={() => onSeleccionar(p.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSeleccionar(p.id); } }}
              >
                <img src={obtenerImagen(p)} alt={p.nombre} loading="lazy"
                  onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
                <div className="nombre">{p.nombre}</div>
                {faccion && (
                  <span className={`faccion-tag ${claseFaccion(faccion)}`}>{faccion}</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
