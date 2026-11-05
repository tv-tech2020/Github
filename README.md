# Xuper para Nuvio — 1.4.1

Esta versión sustituye el scaffold de activación Samsung 1.3.0 por el plugin Xuper incluido en el ZIP de referencia `nuvio-official-plugins-main` que aportó el usuario. El código implementa búsqueda por título/año usando TMDB y búsqueda/resolución mediante el adaptador `__tv` que proporciona el runtime de Nuvio.

## Instalación

Publica `manifest.json` y `providers/xuper.js` en la raíz de tu repositorio y añade la URL raw del manifiesto en Nuvio estándar. Requiere Nuvio 0.6.7 o superior según el repositorio de referencia.

## Importante

- Es una integración de referencia, no una prueba de reproducción en el dispositivo del usuario. La compatibilidad depende de que la versión instalada de Nuvio exponga `kino.tmdb`, `globalThis.__tv.search` y `globalThis.__tv.resolve`.
- Esta variante no muestra campos de usuario/contraseña: la implementación de referencia no usa autenticación de cuenta verificable.
- La clave interna del portal está incluida en el JavaScript del proveedor; no debe considerarse secreta.
- No incorpora recuperación de tokens de sesión compartidos desde repositorios públicos.
