/* Xuper -> Nuvio provider scaffold (credential-access variant)
 * Nuvio contract: getStreams(tmdbId, mediaType, season, episode) -> Promise<Array>
 * This is NOT a working extractor yet. Do not paste secrets into this file or Git.
 */
var XUPER_PROVIDER_NAME = "Xuper";
var XUPER_CONFIG = {
  // Fill only with credentials/configuration you are authorized to use.
  // Do not put Kino-sealed values here: Nuvio cannot decrypt Kino's sealed secrets.
  credentialMode: "external-config-required",
  portalBaseUrl: "",
  // Implement this adapter with the official/authorized Xuper key material.
  decryptResponse: null
};

function getStreams(tmdbId, mediaType, season, episode) {
  console.warn("[Xuper] Provider scaffold only: portal auth/decryption adapter is not implemented.");
  console.warn("[Xuper] Requested", mediaType, tmdbId, "S", season, "E", episode);
  // Return the Nuvio-compatible shape. Empty until a valid source is resolved.
  return Promise.resolve([]);
}

module.exports = { getStreams: getStreams };
