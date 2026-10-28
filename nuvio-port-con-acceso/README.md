# Xuper → Nuvio estándar (variante con acceso autorizado)

**Estado: scaffold de integración; NO es todavía un proveedor funcional ni un ZIP instalable validado.**

Esta variante supone que sí tienes acceso legítimo a la configuración/clave necesaria para hablar con el portal de Xuper. El secreto sellado de `kino-plugin.json` no se puede reutilizar directamente en Nuvio: el runtime de Kino lo descifra y Nuvio no comparte ese mecanismo.

## Qué incluye
- El proyecto original de Kino sin sustituirlo.
- `provider.js`, con la firma de proveedor Nuvio `getStreams(tmdbId, mediaType, season, episode)`.
- Una interfaz de configuración para implementar el adaptador autorizado de autenticación/cifrado.

## Qué falta antes de usarlo
1. Implementar el transporte del portal en el runtime de Nuvio.
2. Conectar el mecanismo de cifrado/descifrado autorizado, sin publicar la clave.
3. Adaptar las respuestas de Xuper a streams (`name`, `title`, `url`, `quality`, `headers` opcionales).
4. Probar películas, series y anime con respuestas reales autorizadas dentro de Nuvio.
5. No habilitar TV en vivo hasta confirmar soporte explícito en la versión de Nuvio objetivo.

Actualmente `getStreams` devuelve `[]` intencionalmente para no fingir que se encontró una fuente reproducible.

Referencia del contrato de proveedor: https://github.com/afanag/nuvio-providers/blob/main/DOCUMENTATION.md
