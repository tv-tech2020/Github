/* Xuper -> Nuvio provider adapter.
 * Portal protocol ported from the supplied Samsung client. Uses device activation
 * only; deliberately excludes public/shared session-token seed recovery.
 */
const crypto = require('crypto');

const KEY = Buffer.from('e7af1ed7de1ffddd7bd3fe37ebdffde9ef3fe1ae39edfeb8', 'hex');
const HOSTS = ['osuhk.m3x8o50te.com', 'oogoy.f30c96w8.com'];
const PORTAL = 'masnew';
const APP_ID = 'com.android.msandroid';
const APK_VERSION = '49902';
const SPKG_VERSION = '2025-08-07 05:40:11_36_16_';
const APK_HEADER = '43404';
const UA = 'okhttp/3.12.12';
const SALT = 'ntFT65w6itH!lHCPw7D=@qnsFC5adD28';
const FIXED_MAC = '02:00:00:00:00:00';
let session = null;

function encryptBody(value) {
  const cipher = crypto.createCipheriv('des-ede3', KEY, Buffer.alloc(0));
  return Buffer.concat([cipher.update(Buffer.from(value, 'utf8')), cipher.final()]).toString('base64').split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}
function decryptBlob(hex) {
  const b64 = Buffer.from(hex, 'hex').toString('ascii');
  const decipher = crypto.createDecipheriv('des-ede3', KEY, Buffer.alloc(0));
  return Buffer.concat([decipher.update(Buffer.from(b64, 'base64')), decipher.final()]).toString('utf8');
}
function randHex(n) { return crypto.randomBytes(n).toString('hex'); }
function trim(v) { return v == null ? '' : String(v).trim(); }

async function post(path, payload) {
  const body = encryptBody(JSON.stringify(payload));
  let last;
  for (const host of HOSTS) {
    try {
      const response = await fetch(`https://${host}/api/portalCore/${path}`, {
        method: 'POST',
        headers: {
          apk: APP_ID, apkVer: APK_HEADER, spkgVer: SPKG_VERSION,
          'User-Agent': UA, 'Content-Type': 'application/json;charset=utf-8'
        }, body
      });
      const envelope = await response.json();
      const code = trim(envelope.returnCode);
      if (code && code !== '0') throw new Error(`${path}: portal ${code} ${trim(envelope.errorMessage)}`);
      if (typeof envelope.data === 'string' && envelope.data) {
        try { return JSON.parse(decryptBlob(envelope.data)); }
        catch (_) { throw new Error(`${path}: respuesta cifrada inválida`); }
      }
      return envelope.data == null ? envelope : envelope.data;
    } catch (e) { last = e; }
  }
  throw last || new Error('Portal no disponible');
}

async function activateDevice() {
  if (session && session.userId && session.userToken) return session;
  const fp = {
    board: 'goldfish_arm64', brand: 'google', cpuAbi: 'arm64-v8a', device: 'emu64a',
    diskInfo: '8GB', display: 'sdk_gphone64_arm64',
    fingerprint: 'google/sdk_gphone64_arm64/emu64a:14/UE1A.230829.036/11228894:user/release-keys',
    hardware: 'ranchu', host: 'abfarm', manufacturer: 'Google', ramSize: '4GB',
    romSize: '8GB', tags: 'release-keys', verId: '', androidId: randHex(8),
    cpuId: randHex(8), serialNumber: randHex(8),
    etheMac: randHex(6).match(/../g).join(':'),
    gatewayMac: randHex(6).match(/../g).join(':'),
    wifiMac: randHex(6).match(/../g).join(':')
  };
  const baseDevice = {
    loginType: '2', appLanguage: 'en', hardwareInfo: 'ranchu',
    model: 'sdk_gphone64_arm64', product: 'sdk_gphone64_arm64', cpu: 'arm64-v8a',
    B29: '', reserve1: '', deviceToken: '', drmId: '', sdkVer: 36,
    apkVersion: APK_VERSION, sysVersion: SPKG_VERSION, appId: APP_ID, sn: ''
  };
  const snData = await post('v3/snToken', { ...fp, ...baseDevice });
  const snToken = trim(snData && snData.snToken);
  if (!snToken) throw new Error('El portal no entregó snToken');
  const sn = trim(snData.sn) || crypto.createHash('md5').update(snToken + SALT).digest('hex');
  const device = { ...baseDevice, sn };
  const active = await post('v8/active', {
    snToken, authVersion: '', authCode: '', preCode: '', macAddr: FIXED_MAC,
    reserve1: '', openNum: 4, channel: 'default', matadata: '', signdata: '', ...device
  });
  const userId = trim(active && active.userId), userToken = trim(active && active.userToken);
  if (!userId || !userToken) throw new Error('El portal no activó el dispositivo');
  session = { sn, userId, userToken, device };
  return session;
}

async function onSettings() {
  return [
    { type: 'header', label: 'Cuenta Xuper' },
    { type: 'text', key: 'username', label: 'Usuario o correo', placeholder: 'Tu usuario' },
    { type: 'text', key: 'password', label: 'Contraseña', placeholder: 'Tu contraseña', isPassword: true },
    { type: 'info', label: 'El cliente Samsung/webOS analizado activa un dispositivo anónimo; no contiene un login verificable con usuario y contraseña. Estos campos aún no se envían al portal.' },
    { type: 'toggle', key: 'debug', label: 'Registrar diagnóstico (sin credenciales)', defaultValue: false }
  ];
}

async function getStreams(tmdbId, mediaType, season, episode) {
  const settings = globalThis.SCRAPER_SETTINGS || {};
  try {
    // Establish whether the official device-activation protocol works. A TMDB ID
    // is not a portal contentId, so do not fabricate a playback URL.
    const s = await activateDevice();
    if (settings.debug) console.log('[Xuper] device activation OK; portal userId present:', !!s.userId,
      'tmdbId:', String(tmdbId || ''), 'type:', mediaType, 'season:', season, 'episode:', episode);
  } catch (e) {
    if (settings.debug) console.log('[Xuper] activation failed:', e && e.message);
  }
  return [];
}

module.exports = { getStreams, onSettings };
