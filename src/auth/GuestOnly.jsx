import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { homeFor } from './roles';

// Halaman khusus tamu (misalnya login). Yang sudah login dialihkan ke halaman awal perannya.
export default function GuestOnly() {
  const { user } = useAuth();
  return user ? <Navigate to={homeFor(user.role)} replace /> : <Outlet />;
}
