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