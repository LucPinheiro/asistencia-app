// db/testConnection.ts

// El hook espera username en TEST_CREDENTIALS
export const TEST_CREDENTIALS = {
  username: 'demo',   // pon aquí lo que quieras por defecto
  password: 'demo',
};

// testAuthentication debe poder llamarse SIN args y devolver un number (uid)
export async function testAuthentication(
  login?: string,
  password?: string
): Promise<number> {
  const user = login ?? TEST_CREDENTIALS.username;
  const pass = password ?? TEST_CREDENTIALS.password;

  // TODO: si quieres, aquí valida contra tu backend/odoo.
  // Devolvemos un uid numérico simulado (>0 para "éxito")
  const isOk = !!user && !!pass;
  return isOk ? 1 : 0;
}

// El hook y/o tests esperan boolean, no { ok: true }
export async function testOdooConnection(): Promise<boolean> {
  // TODO: podrías hacer una llamada real (por ejemplo, /jsonrpc -> version)
  return true;
}

// También boolean
export async function quickTest(): Promise<boolean> {
  return true;
}
