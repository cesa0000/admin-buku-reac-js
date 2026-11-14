// Daftar peran dan halaman awal masing-masing peran.
export const ROLES = { ADMIN: 'admin', USER: 'user' };

export const homeFor = (role) => (role === ROLES.ADMIN ? '/admin' : '/');
