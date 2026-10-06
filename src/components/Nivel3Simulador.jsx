import { obtenerImagen } from '../api.js';

export default function Nivel3Simulador({
  eventos,
  personajes,
  eventoSeleccionadoId,
  onCambiarEvento,
  resultado,
  simulando,
  onSimular,
}) {
  const evento = eventos.find((e) => String(e.id) === String(eventoSeleccionadoId));
  const participantesIds = evento?.personajesParticipantesIds || [];

  return (
    <section className="nivel" style={{ borderBottom: 'none' }}>
      <div className="nivel-head">
        <span className="nivel-index">NIVEL 03</span>
        <h2>Simulación de enfrentamiento</h2>
      </div>
      <p className="nivel-endpoint">POST /eventos/{'{id}'}/simular</p>
      <p className="nivel-desc">
        El endpoint más complejo: calcula un resultado en base al poder de cada
        participante más un factor aleatorio, y guarda el resultado en el propio
        evento. Esto es lógica de negocio, no un CRUD.
      </p>

      <div className="simulador">
        {eventos.length === 0 ? (
          <select disabled><option>Conéctate a la API para listar eventos</option></select>
        ) : (
          <select value={eventoSeleccionadoId ?? ''} onChange={(e) => onCambiarEvento(e.target.value)}>
            {eventos.map((e) => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
        )}

        <div className="participantes-row">
          {participantesIds.map((id) => {
            const p = personajes.find((pp) => pp.id === id);
            if (!p) return null;
            const esGanador = resultado?.ganadorId === id;
            return (
              <img
                key={id}
                className={`participante-avatar ${esGanador ? 'ganador' : ''}`}
                src={obtenerImagen(p)}
                alt={p.nombre}
                title={p.nombre}
                onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
              />
            );
          })}
        </div>

        <button className="btn btn-cyan" disabled={!evento || simulando} onClick={onSimular}>
          {simulando ? 'Calculando…' : 'Simular enfrentamiento'}
        </button>

        <div className="readout">
          {resultado?.ok && <span className="ok">✓ {resultado.mensaje}</span>}
          {resultado?.ok === false && <span className="err">✗ {resultado.mensaje}</span>}
        </div>
      </div>
    </section>
  );
}
