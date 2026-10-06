import { obtenerImagen } from '../api.js';

export default function Nivel2Ficha({ ficha, cargando }) {
  return (
    <section className="nivel">
      <div className="nivel-head">
        <span className="nivel-index">NIVEL 02</span>
        <h2>Ficha de combate</h2>
      </div>
      <p className="nivel-endpoint">GET /personajes/{'{id}'}/con-card</p>
      <p className="nivel-desc">
        Combina dos fuentes de datos — el personaje y su card de stats — en una sola
        respuesta. No es un simple registro: ya hay una unión de datos detrás.
      </p>

      {cargando && <p className="placeholder">Cargando ficha…</p>}

      {!cargando && !ficha && (
        <p className="placeholder">Selecciona un personaje en el Nivel 01.</p>
      )}

      {!cargando && ficha && (
        <div className="ficha-combate">
          <img src={obtenerImagen(ficha)} alt={ficha.nombre}
            onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
          <div className="datos">
            <h3>{ficha.nombre}</h3>
            <p className="sub">{[ficha.especie, ficha.afiliacion, ficha.estado].filter(Boolean).join(' · ')}</p>

            {ficha.card ? (
              <>
                <div className="stat-row">
                  <div className="stat-label"><span>Poder</span><span>{ficha.card.poder}</span></div>
                  <div className="stat-bar-track"><div className="stat-bar-fill" style={{ width: `${ficha.card.poder}%` }} /></div>
                </div>
                <div className="stat-row">
                  <div className="stat-label"><span>Peligrosidad</span><span>{ficha.card.peligrosidad}</span></div>
                  <div className="stat-bar-track"><div className="stat-bar-fill peligro" style={{ width: `${ficha.card.peligrosidad}%` }} /></div>
                </div>
                <div className="extra">
                  <div><b>Habilidad:</b> {ficha.card.habilidadEspecial}</div>
                  <div><b>Arma:</b> {ficha.card.arma}</div>
                </div>
              </>
            ) : (
              <p className="placeholder">Este personaje no tiene card de stats asignada.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
