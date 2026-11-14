import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { homeFor } from '../auth/roles';

export default function Forbidden() {
  const { user } = useAuth();
  return (
    <header className="head">
      <h2>Akses ditolak</h2>
      <p>Akun Anda tidak punya izin untuk membuka halaman tersebut.</p>
      <p><Link to={homeFor(user.role)}>Kembali ke halaman utama</Link></p>
    </header>
  );
}
