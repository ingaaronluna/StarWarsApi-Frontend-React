import { useState } from 'react';
import ConnectionBar from './components/ConnectionBar.jsx';
import Nivel1Registro from './components/Nivel1Registro.jsx';
import Nivel2Ficha from './components/Nivel2Ficha.jsx';
import Nivel3Simulador from './components/Nivel3Simulador.jsx';
import { ENDPOINTS, apiGet, apiPost } from './api.js';

export default function App() {
  const [apiBase, setApiBase] = useState('http://localhost:5000');
  const [status, setStatus] = useState({ state: '', text: 'sin conexión' });

  const [personajes, setPersonajes] = useState([]);
  const [eventos, setEventos] = useState([]);

  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const [ficha, setFicha] = useState(null);
  const [cargandoFicha, setCargandoFicha] = useState(false);

  const [eventoSeleccionadoId, setEventoSeleccionadoId] = useState(null);
  const [resultadoSimulacion, setResultadoSimulacion] = useState(null);
  const [simulando, setSimulando] = useState(false);

  async function conectar() {
    const base = apiBase.replace(/\/$/, '');
    setApiBase(base);
    setStatus({ state: '', text: 'conectando…' });

    try {
      const [listaPersonajes, listaEventos] = await Promise.all([
        apiGet(base, ENDPOINTS.personajes),
        apiGet(base, ENDPOINTS.eventos),
      ]);
      setPersonajes(listaPersonajes || []);
      setEventos(listaEventos || []);
      setStatus({ state: 'ok', text: `${base} — conectado` });

      if (listaEventos?.length) setEventoSeleccionadoId(listaEventos[0].id);
    } catch {
      setStatus({ state: 'err', text: 'no se pudo conectar (¿CORS o API apagada?)' });
    }
  }

  async function seleccionarPersonaje(id) {
    setSeleccionadoId(id);
    setCargandoFicha(true);
    setFicha(null);
    try {
      const data = await apiGet(apiBase, ENDPOINTS.personajeConCard(id));
      setFicha(data);
    } catch {
      setFicha(null);
    } finally {
      setCargandoFicha(false);
    }
  }

  async function simular() {
    if (!eventoSeleccionadoId) return;
    setSimulando(true);
    setResultadoSimulacion(null);
    try {
      const data = await apiPost(apiBase, ENDPOINTS.simularEvento(eventoSeleccionadoId));
      setResultadoSimulacion({
        ok: true,
        mensaje: data.resultado,
        ganadorId: data.ganadorId,
      });
    } catch {
      setResultadoSimulacion({ ok: false, mensaje: 'No se pudo simular el evento.' });
    } finally {
      setSimulando(false);
    }
  }

  function cambiarEvento(id) {
    setEventoSeleccionadoId(id);
    setResultadoSimulacion(null);
  }

  return (
    <>
      <ConnectionBar apiBase={apiBase} setApiBase={setApiBase} status={status} onConectar={conectar} />

      <div className="wrap">
        <section className="hero">
          <p className="hero-eyebrow">// panel de pruebas — React</p>
          <h1>Banco de Datos Galáctico</h1>
          <p>
            Tres niveles de acceso al mismo archivo: una consulta simple, una ficha
            combinada y una simulación con lógica de negocio real. Cada nivel llama
            a un endpoint distinto de la API.
          </p>
        </section>

        <Nivel1Registro
          personajes={personajes}
          seleccionadoId={seleccionadoId}
          onSeleccionar={seleccionarPersonaje}
        />

        <Nivel2Ficha ficha={ficha} cargando={cargandoFicha} />

        <Nivel3Simulador
          eventos={eventos}
          personajes={personajes}
          eventoSeleccionadoId={eventoSeleccionadoId}
          onCambiarEvento={cambiarEvento}
          resultado={resultadoSimulacion}
          simulando={simulando}
          onSimular={simular}
        />
      </div>
    </>
  );
}
