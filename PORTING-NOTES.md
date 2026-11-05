# Notas de portabilidad 1.4.0

- Reemplaza la implementación incompleta de activación-only 1.3.0.
- Usa el proveedor Xuper del ZIP de referencia para Nuvio oficial.
- La búsqueda de títulos obtiene título original y año con TMDB.
- Filtra candidatos por similitud de título y año antes de resolver enlaces.
- Usa el contrato global `__tv.search(query)` y `__tv.resolve(ref)` del runtime.
- Validación local: sintaxis JavaScript y estructura JSON del manifiesto.
- No se ha podido probar streaming real en una instalación Nuvio; el usuario debe verificar en su dispositivo.

## Corrección 1.4.1

- La búsqueda del runtime devuelve `{ items, next }`; la versión 1.4.0 solo aceptaba arrays y descartaba todos los resultados.
- Ahora se normalizan las respuestas paginadas (`items`, `results` o array), se registran conteos y errores TMDB, y se mantienen las alternativas VOD con headers de autorización.
