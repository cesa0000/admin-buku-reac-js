import { useAuth } from '../auth/AuthContext';

export default function Profile() {
  const { user, expiresAt } = useAuth();
  const expiry = new Date(expiresAt).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });

  return (
    <>
      <header className="head">
        <h2>Profil</h2>
        <p>Data akun yang sedang masuk.</p>
      </header>
      <dl className="detail">
        <dt>Nama</dt><dd>{user.name}</dd>
        <dt>Email</dt><dd>{user.email}</dd>
        <dt>Peran</dt><dd>{user.role}</dd>
        <dt>Sesi berakhir</dt><dd>{expiry}</dd>
      </dl>
    </>
  );
}
