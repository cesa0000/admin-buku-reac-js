import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ROLES } from '../auth/roles';

const { ADMIN, USER } = ROLES;

// Menu didefinisikan sebagai data; yang tampil disaring berdasarkan peran.
const MENU = [
  { to: '/', label: 'Beranda', roles: [USER, ADMIN], end: true },
  { to: '/profile', label: 'Profil', roles: [USER, ADMIN] },
  { to: '/admin', label: 'Dashboard', roles: [ADMIN], end: true },
  { to: '/admin/genres', label: 'Genre', roles: [ADMIN] },
  { to: '/admin/authors', label: 'Penulis', roles: [ADMIN] },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="shell">
      <aside className="side">
        <h1 className="brand">Booksales</h1>
        <nav aria-label="Menu utama">
          {MENU.filter((m) => m.roles.includes(user.role)).map((m) => (
            <NavLink key={m.to} to={m.to} end={m.end}>
              {m.label}
            </NavLink>
          ))}
        </nav>
        <div className="who">
          <strong>{user.name}</strong>
          <span className={`badge ${user.role}`}>{user.role === ADMIN ? 'Admin' : 'Pengguna'}</span>
          <button type="button" onClick={handleLogout}>Keluar</button>
        </div>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
