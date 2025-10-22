/**
 * Configuración de conexión a Odoo
 */

import { Platform } from 'react-native';
import { rpcCall } from './rpc';

// Helpers para dev: host correcto por plataforma
const DEV_HOST =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8017/jsonrpc'   // Android emulador
    : 'http://localhost:8017/jsonrpc'; // iOS simulator / Web

// Config por entorno (usa siempre /jsonrpc)
const CONFIG = {
  development: {
    web: 'http://localhost:8017/jsonrpc',
    mobile: DEV_HOST,
  },
  production: {
    web: 'https://registro.sinerkia-dev.com/jsonrpc',
    mobile: 'https://registro.sinerkia-dev.com/jsonrpc',
  },
};

const isDevelopment = __DEV__;
const environment = isDevelopment ? 'development' : 'production';
const isWeb = Platform.OS === 'web';
const platformKey = isWeb ? 'web' : 'mobile';

// URL por defecto según entorno/plataforma
export const DEFAULT_RPC_URL = CONFIG[environment][platformKey];

// URL mutable actual (inicia con la default; ¡ojo con /jsonrpc!)
export let RPC_URL = DEFAULT_RPC_URL;

// Nombre de la base de datos
export const DB = 'registro';

// Logs (opcionales)
console.log('🔧 ODOO CONFIG');
console.log('  Entorno:', environment);
console.log('  Plataforma:', Platform.OS);
console.log('  URL por defecto:', DEFAULT_RPC_URL);
console.log('  URL actual:', RPC_URL);
console.log('  DB:', DB);

export function setRpcUrl(url: string) {
  RPC_URL = url;
  console.log('🔄 URL RPC actualizada a:', url);
}

export function resetRpcUrl() {
  RPC_URL = DEFAULT_RPC_URL;
  console.log('🔄 URL RPC restablecida a:', RPC_URL);
}

// ⚠️ Solo para desarrollo — NUNCA metas credenciales reales en cliente
const TEST_CREDENTIALS = isDevelopment
  ? { login: 'dev3@sinerkia.com', password: 'odoo' }
  : { login: '', password: '' };

/**
 * Prueba de conexión (opcional)
 * Autentica contra Odoo usando rpcCall
 */
export async function testConnection(): Promise<boolean> {
  try {
    console.log('🧪 Test de login automático (DEV):', RPC_URL, DB);

    const userId = await rpcCall<number | false>(
      'common',
      'authenticate',
      [DB, TEST_CREDENTIALS.login, TEST_CREDENTIALS.password, {}],
      RPC_URL
    );

   if (typeof userId === 'number' && userId > 0) {

      console.log('✅ Login OK. UID:', userId);
      return true;
    } else {
      console.warn('⚠️ Login fallido. Resultado:', userId);
      return false;
    }
  } catch (error: any) {
    console.error('💥 Error en testConnection:', error?.message ?? error);
    if (typeof error?.message === 'string') {
      if (error.message.includes('CORS')) {
        console.warn('🔗 Revisa CORS en el backend o usa un proxy en DEV.');
      }
      if (error.message.includes('Failed to fetch')) {
        console.warn('🔗 Revisa conectividad/URL/puerto/DB.');
      }
    }
    return false;
  }
}

// ✅ Solo ejecuta autologin en DESARROLLO (evita efectos colaterales en prod)
if (isDevelopment) {
  (async () => {
    console.log('🚀 Iniciando testConnection (DEV)…');
    const ok = await testConnection();
    if (ok) console.log('🎉 Autenticación DEV OK'); else console.log('❌ Autenticación DEV KO');
  })();
}
