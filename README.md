# Xuper Nuvio — configuración de cuenta

Este paquete registra un proveedor JavaScript de Nuvio con ajustes configurables para usuario/correo, contraseña y una clave de cifrado opcional del portal.

## Instalar

Usa la URL pública del `manifest.json` de este repositorio en Ajustes → Plugins de Nuvio/Arrivo.

## Estado real

**Este paquete todavía es un scaffold, no un extractor funcional.** Los campos de configuración se declaran usando `onSettings` y el manifiesto `hasSettings: true`; `getStreams` registra únicamente si hay valores configurados y devuelve `[]` deliberadamente.

Para reproducir contenido todavía se debe portar y probar la autenticación del portal, el cifrado/descifrado y la resolución de enlaces desde la implementación original de Kino. `magisKey` es una clave de cifrado distinta de la contraseña de cuenta; no se puede inferir de las credenciales.

No introduzcas credenciales reales en archivos del repositorio. Escríbelas solo en la pantalla de ajustes de la app. No publiques capturas que las muestren.
