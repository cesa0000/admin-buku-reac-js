# Booksales Admin (Tugas React JS Lanjutan #1 dan #4)

Fitur **read** dan **create** untuk **Genre** dan **Penulis (Author)** pada tampilan Admin.

## Menjalankan
```bash
npm install
npm run dev
```
Buka http://localhost:5173 (rute: `/admin/genres` dan `/admin/authors`).

## Catatan
- Data disimpan di localStorage lewat `src/api.js`. Untuk memakai backend, ganti `getAll()` dan `create()` dengan fetch/axios.
- Validasi: nama wajib diisi, nama tidak boleh duplikat, tahun lahir harus wajar.

## Upload ke GitHub (private)
```bash
git init
git add .
git commit -m "Tugas 1: read & create genre dan author"
git branch -M main
git remote add origin https://github.com/USERNAME/admin-buku.git
git push -u origin main
```
Lalu di GitHub: Settings > Collaborators > Add people > masukkan username mentor.

## Tugas #4: Routing dan hak akses
- `src/auth/authService.js` : login, sesi (localStorage, kedaluwarsa 8 jam), logout.
- `src/auth/AuthContext.jsx` : menyimpan pengguna yang sedang login (Context API).
- `src/auth/RequireAuth.jsx` : penjaga rute; bisa dibatasi per peran.
- `src/auth/GuestOnly.jsx` : halaman login hanya untuk yang belum masuk.
- `src/components/Layout.jsx` : menu berubah sesuai peran.

| Halaman | Tamu | User | Admin |
|---|---|---|---|
| /login | ya | dialihkan | dialihkan |
| / dan /profile | ke login | ya | ya |
| /admin, /admin/genres, /admin/authors | ke login | /forbidden | ya |

Akun contoh: admin@booksales.test / admin123 dan rina@booksales.test / rina123.
