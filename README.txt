Xuper Nuvio 2.1.7 - compatibilidad Hermes y resolución SLB actualizada

Basado en el archivo xuper.js del repositorio oficial nuvio-official-plugins.
Incluye una sola fuente (Xuper) y registra etapas:
1. Inicio / TMDB
2. Búsqueda del catálogo
3. Normalización de resultados (array, items, results o data)
4. Coincidencia y resolución

Añade respaldos cuando Hermes no expone WebCrypto/crypto y reemplaza las dependencias de TextEncoder con una codificación UTF-8 compatible. La resolución prueba SLB v15 y luego v14, y usa una autorización VOD gratuita del portal si no viene marcada como CacheFly. En series selecciona la pista cuyo programContentId coincide con el episodio solicitado. Si Hermes lanza un ReferenceError durante SLB, el log registra el nombre de la referencia ausente sin imprimir tokens ni cabeceras. Los bytes aleatorios solo se usan para huellas y selección de semilla, nunca como token de autenticación o clave criptográfica. El texto cifrado, que es Base64 ASCII, se pasa a hexadecimal sin depender de TextEncoder.

No incorpora credenciales ni tokens compartidos. La disponibilidad de streams depende de que el servicio entregue resultados y enlaces autorizados.

Instalación: importar este ZIP como repositorio/plugin en Nuvio TV.
Prueba sugerida: película TMDB 603. Luego revisar Diagnósticos/logs.

Compatibilidad con Nuvio TV 2.1.7: el limitador de llamadas tolera los entornos Hermes donde kino.sleep falla porque no existe setTimeout global. Las llamadas siguen serializadas.

La búsqueda deja de consultar variantes cuando encuentra el título exacto y la temporada solicitada; si no hay coincidencia exacta, conserva las búsquedas de respaldo.
