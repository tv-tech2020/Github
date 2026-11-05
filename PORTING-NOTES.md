# Estado de la adaptación Xuper → Nuvio

## Avance 1.3.0
- Portado el protocolo de cifrado/descifrado 3DES-EDE y la capa POST del cliente Samsung.
- Implementada la activación primaria de dispositivo (`v3/snToken` → `v8/active`) con huella Android emulada.
- La sesión se conserva en memoria durante la vida del proveedor.
- Se excluyó expresamente la recuperación de tokens compartidos desde `seeds.json`.
- Los ajustes de usuario/contraseña se conservan en Nuvio, pero no se transmiten: los ZIP analizados no demuestran un endpoint de login con esas credenciales.

## Pendiente antes de reproducir
1. Confirmar el endpoint y esquema de búsqueda del portal; `TMDB ID` no es un `contentId` del proveedor.
2. Portar el detalle de catálogo y resolución VOD (incluidos SLB, headers y subtítulos) al runtime Nuvio.
3. Verificar si Nuvio permite los módulos `crypto` y `fetch` requeridos por este port.
4. Probar con una cuenta/dispositivo autorizado y un título concreto.

El proveedor devuelve una lista vacía hasta que pueda resolver un stream real. No inventa URLs ni reutiliza tokens de terceros.
