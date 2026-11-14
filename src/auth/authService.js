// Service otorisasi (simulasi tanpa backend).
// Sesi disimpan di localStorage dan punya masa berlaku, jadi login hilang otomatis saat kedaluwarsa.
// Catatan: pemeriksaan di frontend hanya mengatur tampilan. Keamanan sebenarnya harus
// dicek ulang oleh backend (token/JWT) pada setiap permintaan data.

const SESSION_KEY = 'booksales_session';
const SESSION_HOURS = 8;

const ACCOUNTS = [
  { id: 1, name: 'Admin Toko', email: 'admin@booksales.test', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Rina Pelanggan', email: 'rina@booksales.test', password: 'rina123', role: 'user' },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function login(email, password) {
  await wait(400);
  const found = ACCOUNTS.find(
    (a) => a.email === email.trim().toLowerCase() && a.password === password
  );
  if (!found) throw new Error('Email atau kata sandi tidak cocok.');

  const { password: _dibuang, ...user } = found; // password tidak ikut disimpan
  const session = {
    user,
    token: crypto.randomUUID(),
    expiresAt: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session.user || session.expiresAt < Date.now()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
