# SisaBaik API

API untuk menghubungkan pembeli dengan usaha penyedia makanan berlebih.

## Persiapan

1. `npm install`
2. Salin `.env.example` menjadi `.env`, lalu isi nilainya.
   Variabel yang dibutuhkan: `PORT`, `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`, `JWT_SECRET`.
   `JWT_SECRET` berupa 64 digit hex acak:
   `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`
   File `.env` diabaikan Git dan tidak boleh dibagikan.

## Migrasi Chapter 8

Jalankan migrasi tanpa mereset skema:

    psql -h localhost -U postgres -d sisabaik_dev -v ON_ERROR_STOP=1 -f database/07_auth.sql

Migrasi menambahkan kolom `kata_sandi_hash` dan `versi_token` pada tabel `pengguna`.

## Menjalankan

- Server: `npm run dev`
- Halaman latihan: http://127.0.0.1:3000/auth.html

## Akun dan peran

- Pembeli mendaftar sendiri melalui `/api/auth/registrasi`.
- Penyedia mendaftar sendiri melalui `/api/auth/registrasi-penyedia`; profil usaha berstatus `menunggu`.
- Pengelola meninjau penyedia lewat CLI:
  - setujui: `npm run penyedia:verifikasi -- <email>`
  - tolak: `npm run penyedia:verifikasi -- <email> --tolak`
- Penyedia dapat mengelola penawaran setelah statusnya `terverifikasi`.

## Logout

Logout menaikkan `versi_token`, sehingga semua token yang sudah terbit untuk akun itu ditolak (`401 SESSION_REVOKED`), termasuk di tab lain.

## Pengujian

    npm run auth:test

Script membuat empat akun uji dengan kata sandi acak yang tidak dicetak. Lihat `docs/hasil-uji-chapter8.md`.

## Frontend Vue (Chapter 9)

Antarmuka SisaBaik dibangun dengan Vue 3 dan Vite di folder `frontend`. Backend Express tetap berada di root repositori.

### Prasyarat
- Node.js 22.18.0 atau lebih baru pada seri 22, atau Node.js 24.12.0 atau lebih baru (diuji dengan v24.21.0)
- npm

### Instalasi
Semua perintah npm frontend dijalankan dari folder `frontend`, bukan dari root.

    cd frontend
    npm install

Pada komputer lain yang sudah memiliki `package-lock.json`, gunakan:

    npm ci

### Menjalankan
| Perintah | Fungsi | Alamat |
| --- | --- | --- |
| `npm run dev` | Server pengembangan | http://127.0.0.1:5173/ |
| `npm run build` | Membuat hasil build di folder `dist` | - |
| `npm run preview` | Memeriksa hasil build secara lokal | http://127.0.0.1:4173/ |

Jangan membuka `index.html` dengan klik ganda atau Live Server; aplikasi harus dibuka melalui server Vite.

### Aset SVG lokal
Semua aset berada di `frontend/src/assets` tanpa CDN atau paket ikon:
- `brand-mark.svg` — logo SisaBaik
- `food-bread.svg` — ilustrasi kategori roti
- `food-bowl.svg` — ilustrasi kategori makanan siap saji
- `food-produce.svg` — ilustrasi kategori bahan segar

### Sumber data
- Pada Chapter 9, frontend memakai enam fixture di memori (`frontend/src/data/penawaran-latihan.js`).
- Browser belum memanggil API backend. Data yang ditambahkan lewat form akan hilang saat halaman di-refresh karena tidak disimpan ke PostgreSQL.
- Pilihan Tampilan (Pembeli / Penyedia Rina) hanya demonstrasi state lokal, bukan login atau otorisasi.

### Hubungan dengan backend
Backend Modul 8 tetap menyediakan pendaftaran mandiri, verifikasi penyedia, autentikasi, dan otorisasi. Integrasi frontend dengan API dilakukan pada pertemuan 11.

### Hasil uji
Lihat `docs/hasil-uji-chapter9.md`.