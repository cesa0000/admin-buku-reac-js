import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ROLES } from '../auth/roles';

export default function Home() {
  const { user } = useAuth();
  const isAdmin = user.role === ROLES.ADMIN;

  return (
    <>
      <header className="head">
        <h2>Halo, {user.name}</h2>
        <p>Beranda ini bisa dibuka oleh semua pengguna yang sudah masuk.</p>
      </header>
      <ul className="shelf">
        <li style={{ '--spine': '#0f6b66' }}>
          <div>
            <strong>Profil saya</strong>
            <span>Lihat data akun dan masa berlaku sesi.</span>
            <Link to="/profile">Buka profil</Link>
          </div>
        </li>
        {isAdmin && (
          <li style={{ '--spine': '#e3a02f' }}>
            <div>
              <strong>Dashboard admin</strong>
              <span>Kelola genre dan penulis. Hanya tampil untuk admin.</span>
              <Link to="/admin">Buka dashboard</Link>
            </div>
          </li>
        )}
      </ul>
    </>
  );
}
