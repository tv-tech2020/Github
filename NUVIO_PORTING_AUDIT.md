# Auditoría de adaptación Xuper → Nuvio estándar

**Estado: adaptación funcional pendiente. Este paquete NO debe instalarse como si fuera un plugin Nuvio terminado.**

## Hallazgos

1. El proyecto adjunto es un plugin de **Kino**, no un scraper/plugin nativo de Nuvio. Su manifiesto es `kino-plugin.json`; la entrada compilada es `plugin.js` y el código exporta funciones del contrato de Kino (`home`, `search`, `browse`, `episodes`, `resolve`, `liveCategories`, `liveChannels`, etc.).
2. La lógica depende de la API de ejecución de Kino (`kino.fetch`, `kino.storage`, `kino.crypto`, errores tipados y secretos sellados). No se puede hacer compatible renombrando el manifiesto ni cambiando las exportaciones.
3. Nuvio estándar usa su propio contrato de plugins/proveedores, centrado en devolver streams para un título. No hay equivalencia directa para todas las funciones de catálogo/home/categorías de Kino.
4. El código contiene secretos sellados para Kino (`kino-plugin.json`), por lo que no se pueden reutilizar de forma segura en el runtime de Nuvio. El port necesita una estrategia de credenciales y cifrado compatible y autorizada.
5. La parte de TV en vivo no debe darse por compatible con Nuvio estándar sin una API explícita de canales en esa versión. Debe quedar fuera del primer port o desarrollarse como integración separada si la aplicación de destino lo admite.

## Validación local realizada

- `npm test`: 705 pruebas; 693 pasan y 12 suites fallan (`adultVod`, `catalog`, `categories`, `countryRow`, `e2e`, `episodes`, `kalley`, `liveTiles`, `resolve`, `scopedSearch`, `search`, `section`). Revisar la salida de cada suite antes de usar el proyecto como base estable.
- `npm run build`: no pudo ejecutarse porque `esbuild` no está instalado en el entorno (`sh: esbuild: not found`). El archivo `plugin.js` ya existe en el ZIP original, pero no se verificó que corresponda al último código fuente.

## Plan necesario para un port real

1. Definir el contrato de plugin de la versión exacta de Nuvio instalada (la app estándar y la variante IPTV no tienen necesariamente las mismas capacidades).
2. Separar la lógica de negocio del runtime Kino, empezando por `src/portal.js`, `src/crypto.js`, `src/session.js` y `src/resolve.js`.
3. Sustituir las dependencias `kino.*` por las APIs permitidas en Nuvio y resolver de nuevo el cifrado/autenticación, sin copiar secretos sellados de Kino.
4. Implementar el adaptador de streams para películas, episodios y anime; validar las respuestas contra el contrato de Nuvio.
5. Tratar TV en vivo como función no compatible hasta verificar un contrato de canales en la app estándar.
6. Añadir pruebas con respuestas ficticias y pruebas de integración con una cuenta/servicio autorizado; luego construir el paquete instalable y probarlo en el dispositivo.

## Referencias técnicas consultadas

- Nuvio plugins/addons: https://nuvio.wiki/addons/
- Referencia de plugins y manifiestos de Kino (para el contrato actual del proyecto): https://kinotvapp.github.io/kino-plugins/manifest/
- Conversión de scrapers Nuvio a plugins de Kino (explica que la conversión descrita es Nuvio → Kino, no al revés): https://kinotvapp.github.io/kino-plugins/nuvio/

## Resultado

Se conserva el código fuente original y se añade esta auditoría para evitar distribuir un ZIP engañoso o que falle al instalarse. Este paquete es una base de trabajo y no una adaptación terminada.
