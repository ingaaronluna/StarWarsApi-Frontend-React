# Panel de pruebas — React

Frontend de defensa para el proyecto StarWarsApi. Muestra 3 endpoints de complejidad creciente contra el backend de cada estudiante.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre la URL que indique la terminal (por defecto `http://localhost:5173`).

## Antes de usarlo con el backend de un estudiante

1. **CORS**: el backend debe permitir peticiones desde otro origen (`AllowAnyOrigin` en `Program.cs`, o al menos `http://localhost:5173`). Si no está, verás "no se pudo conectar" en la barra superior aunque la API esté corriendo.

2. **Campo de imagen**: `src/api.js` → `obtenerImagen()` ya prueba varios nombres comunes (`image`, `imagenUrl`, `imageUrl`, `foto`, `avatar`). Si un estudiante usó otro nombre, agrégalo ahí.

## Qué endpoint cubre cada nivel

| Nivel | Endpoint | Qué demuestra |
|---|---|---|
| 01 — Registro | `GET /personajes` | Lectura simple de una lista |
| 02 — Ficha de combate | `GET /personajes/{id}/con-card` | Combinación de dos fuentes de datos |
| 03 — Simulación | `POST /eventos/{id}/simular` | Lógica de negocio real, no CRUD |

## Si no conecta por CORS usa lo siguiente en tu program.cs

```
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});
```