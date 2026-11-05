Xuper Nuvio 2.1.1 - compatibilidad Hermes y diagnóstico

Basado en el archivo xuper.js del repositorio oficial nuvio-official-plugins.
Incluye una sola fuente (Xuper) y registra etapas:
1. Inicio / TMDB
2. Búsqueda del catálogo
3. Normalización de resultados (array, items, results o data)
4. Coincidencia y resolución

Añade un respaldo para generar identificadores de dispositivo cuando Hermes no expone WebCrypto/crypto. Se usa solo para huellas y selección de semilla, nunca como token de autenticación o clave criptográfica.

No incorpora credenciales ni tokens compartidos. La disponibilidad de streams depende de que el servicio entregue resultados y enlaces autorizados.

Instalación: importar este ZIP como repositorio/plugin en Nuvio TV.
Prueba sugerida: película TMDB 603. Luego revisar Diagnósticos/logs.
