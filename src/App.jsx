import { Link, Route, Routes } from 'react-router-dom';
import GuestOnly from './auth/GuestOnly';
import RequireAuth from './auth/RequireAuth';
import { ROLES } from './auth/roles';
import Layout from './components/Layout';
import Authors from './pages/Authors';
import Dashboard from './pages/Dashboard';
import Forbidden from './pages/Forbidden';
import Genres from './pages/Genres';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      {/* Hanya untuk tamu */}
      <Route element={<GuestOnly />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Wajib login (semua peran) */}
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forbidden" element={<Forbidden />} />

          {/* Khusus admin */}
          <Route element={<RequireAuth roles={[ROLES.ADMIN]} />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/genres" element={<Genres />} />
            <Route path="/admin/authors" element={<Authors />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<p style={{ padding: 32 }}>Halaman tidak ditemukan. <Link to="/">Ke beranda</Link></p>} />
    </Routes>
  );
}
