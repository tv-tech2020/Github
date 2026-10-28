# Xuper for Nuvio — credential-access scaffold

This repository has a root `manifest.json` and a single-file provider at `providers/xuper.js`, matching the standard Nuvio provider repository layout.

## Status

**Not functional for playback yet.** `getStreams()` intentionally returns an empty array until the authorized Xuper portal request, authentication, response decoding, and stream mapping are implemented and tested.

This package assumes you may have authorized access to the original service configuration. It does **not** contain the real `magisKey`, and Kino-sealed secrets cannot be copied directly into Nuvio. Do not put credentials in a public GitHub repository.

## Publish/test

Upload the *contents* of this ZIP to the root of a GitHub repository, keeping these paths:

- `manifest.json`
- `providers/xuper.js`

Then the manifest URL format is:

`https://raw.githubusercontent.com/OWNER/REPOSITORY/BRANCH/manifest.json`

The manifest may load as a provider entry, but playback will return no streams until the source integration is implemented. Movies and series are declared; anime will be supported only when the source lookup can resolve it through the movie/TV parameters. Live TV is not implemented in this provider contract.
