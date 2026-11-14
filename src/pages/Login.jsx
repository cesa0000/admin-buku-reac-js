import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { homeFor } from '../auth/roles';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (!form.email.trim() || !form.password) return setError('Isi email dan kata sandi.');
    setBusy(true);
    setError('');
    try {
      const user = await login(form.email, form.password);
      navigate(location.state?.from ?? homeFor(user.role), { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="login-wrap">
      <form className="panel login-card" onSubmit={submit} noValidate>
        <h2>Masuk ke Booksales</h2>
        {location.state?.from && (
          <p className="msg ok">Masuk dulu untuk membuka halaman {location.state.from}.</p>
        )}
        <label>
          Email
          <input type="email" autoComplete="username" value={form.email} onChange={set('email')} />
        </label>
        <label>
          Kata sandi
          <input type="password" autoComplete="current-password" value={form.password} onChange={set('password')} />
        </label>
        {error && <p className="msg err" role="alert">{error}</p>}
        <button type="submit" disabled={busy}>{busy ? 'Memeriksa…' : 'Masuk'}</button>
        <div className="demo">
          <p>Akun contoh untuk pengujian:</p>
          <p>Admin: admin@booksales.test / admin123</p>
          <p>Pengguna: rina@booksales.test / rina123</p>
        </div>
      </form>
    </div>
  );
}
