/* Xuper -> Nuvio provider scaffold (credential-access variant).
 * Nuvio provider API: getStreams(tmdbId, mediaType, season, episode).
 * This is a structurally valid starter, NOT a working stream extractor.
 * Never commit real secrets or Kino-sealed values to a public repository.
 */
function getStreams(tmdbId, mediaType, season, episode) {
  console.log('[Xuper] Provider scaffold: authorized portal authentication and response decoding are not implemented.');
  console.log('[Xuper] Request:', { tmdbId: String(tmdbId || ''), mediaType: mediaType, season: season, episode: episode });
  return Promise.resolve([]);
}

module.exports = { getStreams: getStreams };
