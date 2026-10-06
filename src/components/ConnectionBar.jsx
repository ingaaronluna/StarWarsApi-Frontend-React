export default function ConnectionBar({ apiBase, setApiBase, status, onConectar }) {
  const dotClass = status.state ? `status-dot ${status.state}` : 'status-dot';

  return (
    <div className="connbar">
      <div className="connbar-inner">
        <span>
          <span className={dotClass}></span>
          <span className="status-text">{status.text}</span>
        </span>
        <label htmlFor="apiBase">URL de la API</label>
        <input
          id="apiBase"
          type="text"
          spellCheck={false}
          value={apiBase}
          onChange={(e) => setApiBase(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onConectar(); }}
        />
        <button className="btn" onClick={onConectar}>Conectar</button>
      </div>
    </div>
  );
}
