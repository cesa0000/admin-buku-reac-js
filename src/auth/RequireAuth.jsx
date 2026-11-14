import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Penjaga rute. Tanpa prop `roles`: cukup sudah login.
// Dengan `roles`: peran pengguna harus termasuk dalam daftar.
export default function RequireAuth({ roles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Simpan tujuan awal supaya setelah login pengguna diarahkan kembali ke sana.
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }
  return <Outlet />;
}
