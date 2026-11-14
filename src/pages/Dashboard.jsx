import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authorStore, genreStore } from '../api';

export default function Dashboard() {
  const [count, setCount] = useState({ genres: null, authors: null });

  useEffect(() => {
    Promise.all([genreStore.getAll(), authorStore.getAll()]).then(([g, a]) =>
      setCount({ genres: g.length, authors: a.length })
    );
  }, []);

  const show = (n) => (n === null ? '…' : n);

  return (
    <>
      <header className="head">
        <h2>Dashboard admin</h2>
        <p>Halaman ini hanya bisa dibuka oleh admin.</p>
      </header>
      <ul className="shelf">
        <li style={{ '--spine': '#0f6b66' }}>
          <div>
            <strong>{show(count.genres)} genre</strong>
            <Link to="/admin/genres">Kelola genre</Link>
          </div>
        </li>
        <li style={{ '--spine': '#e3a02f' }}>
          <div>
            <strong>{show(count.authors)} penulis</strong>
            <Link to="/admin/authors">Kelola penulis</Link>
          </div>
        </li>
      </ul>
    </>
  );
}
