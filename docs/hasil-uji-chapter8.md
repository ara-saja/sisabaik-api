# Hasil Uji Chapter 8

- Branch: feature/auth-rbac
- Commit fitur: 5d564f8
- Database: sisabaik_dev (PostgreSQL lokal)
- Akun manual: Rina Baru dan Budi Baru (penyedia), Siti Baru dan Andi Baru (pembeli)
- Uji otomatis: `npm run auth:test` → PASS 44 pemeriksaan; penawaran 14, pesanan 7

Bukti tidak memuat JWT, hash, atau kata sandi.

## Matriks hasil aktual

| Skenario | Ekspektasi | Hasil aktual | Efek yang diperiksa |
|---|---|---|---|
| GET pesanan tanpa token | 401 AUTH_REQUIRED | (isi) | |
| Token rusak | 401 TOKEN_INVALID | (isi) | |
| Token kedaluwarsa | 401 TOKEN_EXPIRED | (isi) | |
| Login salah / akun tidak dikenal | 401 LOGIN_FAILED | (isi) | |
| Registrasi pembeli valid | 201 | 201 | hash tersimpan (memiliki_hash = t) |
| Registrasi penyedia valid | 201; menunggu | 201; menunggu | profil usaha dibuat |
| Penyedia belum disetujui | 403 PROVIDER_NOT_VERIFIED | (isi) | |
| Registrasi menyisipkan peran | 400 | (isi) | |
| Pembeli membuat penawaran | 403 ROLE_FORBIDDEN | (isi) | |
| Penyedia membuat pesanan | 403 ROLE_FORBIDDEN | (isi) | |
| Body menyisipkan emailPembeli/penyediaId | 400 | (isi) | |
| Budi ubah/hapus penawaran Rina | 404 | (isi) | data Rina tetap |
| Andi membaca pesanan Siti | 404 | (isi) | |
| Daftar pesanan Budi | hanya cakupan sendiri | 200, jumlah 0 | pesanan Rina tidak terlihat |
| Draft di katalog publik | 404 / tidak tampil | (isi) | |
| Logout lalu token lama | 401 SESSION_REVOKED | 401 SESSION_REVOKED | token versi lama ditolak |
| Akun Andi dinonaktifkan | 401 | (isi) | |
| Mutasi sah pemilik | 201/200/204 | (isi) | |
| Hapus penawaran dengan riwayat | 409 REFERENCE_CONFLICT | (isi) | |
| Login melewati batas | 429 AUTH_RATE_LIMIT | (isi) | Retry-After |
| Snapshot harga pesanan 7 | harga tetap 5000 | (isi dari query) | |
| Penolakan penyedia Budi | status ditolak | (isi) | izin jual hilang |