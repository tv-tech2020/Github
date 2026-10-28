/* Xuper -> Nuvio provider scaffold with user-configurable credentials.
 * IMPORTANT: account settings are exposed in Nuvio, but the Kino portal protocol
 * has not yet been ported. This scaffold intentionally returns no streams until
 * authenticated requests and response decryption are implemented and tested.
 */
async function onSettings() {
  return [
    { type: "header", label: "Cuenta Xuper" },
    {
      type: "text",
      key: "username",
      label: "Usuario o correo",
      placeholder: "Introduce tu usuario o correo",
      description: "Se guarda en los ajustes del proveedor de Nuvio."
    },
    {
      type: "text",
      key: "password",
      label: "Contraseña",
      placeholder: "Introduce tu contraseña",
      isPassword: true,
      description: "No la publiques en GitHub ni la compartas en capturas."
    },
    { type: "header", label: "Protocolo (avanzado)" },
    {
      type: "text",
      key: "magisKey",
      label: "Clave de cifrado del portal (si la tienes)",
      placeholder: "Déjala vacía si no la conoces",
      isPassword: true,
      description: "Es distinta de tu contraseña de cuenta. La clave sellada de Kino no se puede reutilizar automáticamente en Nuvio."
    },
    {
      type: "info",
      label: "Estado: experimental. Los ajustes aparecen, pero aún falta portar la autenticación, el cifrado y la extracción de fuentes."
    }
  ];
}

async function getStreams(tmdbId, mediaType, season, episode) {
  const settings = globalThis.SCRAPER_SETTINGS || {};
  const hasUsername = typeof settings.username === "string" && settings.username.trim().length > 0;
  const hasPassword = typeof settings.password === "string" && settings.password.length > 0;
  const hasPortalKey = typeof settings.magisKey === "string" && settings.magisKey.length > 0;
  console.log("[Xuper] Settings status:", {
    usernameConfigured: hasUsername,
    passwordConfigured: hasPassword,
    portalKeyConfigured: hasPortalKey,
    mediaType: mediaType,
    tmdbId: String(tmdbId || ""),
    season: season == null ? null : season,
    episode: episode == null ? null : episode
  });
  console.warn("[Xuper] Authentication/decryption/source extraction is not implemented; returning no streams.");
  return [];
}

module.exports = { getStreams, onSettings };
