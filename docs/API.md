# Dokumentasi API SisaBaik (Chapter 8)

Request privat memakai header `Authorization: Bearer <token>`. Token berlaku 15 menit.

## Autentikasi

| Method | Path | Body | Sukses |
|---|---|---|---|
| POST | /api/auth/registrasi | namaLengkap, email, kataSandi | 201 |
| POST | /api/auth/registrasi-penyedia | namaLengkap, email, kataSandi, namaUsaha, alamat, nomorTelepon | 201, status `menunggu` |
| POST | /api/auth/login | email, kataSandi | 200, accessToken |
| GET | /api/auth/saya | - | 200 |
| POST | /api/auth/logout | `{}` | 204 |

Kata sandi minimal 15 karakter dan maksimal 72 byte UTF-8. Field `peran`, status, atau ID tambahan ditolak (400).

## Penawaran

| Method | Path | Akses |
|---|---|---|
| GET | /api/penawaran | publik |
| GET | /api/penawaran/:id | publik |
| GET | /api/penawaran/milik-saya | penyedia terverifikasi |
| POST | /api/penawaran | penyedia terverifikasi |
| PUT | /api/penawaran/:id | penyedia pemilik |
| DELETE | /api/penawaran/:id | penyedia pemilik |

Body penawaran: nama, kategori, hargaNormal, hargaPenawaran, stok, satuan, status, berakhirPada. `penyediaId` diambil dari akun, bukan dari body.

Katalog publik hanya menampilkan penawaran aktif yang masih tersedia; draft hanya terlihat oleh pemiliknya.

## Pesanan

| Method | Path | Akses |
|---|---|---|
| GET | /api/pesanan | pembeli: pesanan sendiri; penyedia: pesanan untuk usahanya |
| GET | /api/pesanan/:id | pemilik pesanan atau penyedia terkait |
| POST | /api/pesanan | pembeli |

Body pesanan hanya `items`. `emailPembeli` tidak diterima.

## Status error

| Status | Kode | Keterangan |
|---|---|---|
| 401 | AUTH_REQUIRED | tanpa token |
| 401 | TOKEN_INVALID | token rusak atau signature salah |
| 401 | TOKEN_EXPIRED | token kedaluwarsa |
| 401 | SESSION_REVOKED | token versi lama setelah logout |
| 401 | LOGIN_FAILED | email atau kata sandi tidak valid |
| 403 | ROLE_FORBIDDEN | peran tidak sesuai |
| 403 | PROVIDER_NOT_VERIFIED | penyedia belum disetujui |
| 404 | - | data tidak ada atau bukan milik pengguna |
| 409 | REGISTRATION_CONFLICT | pendaftaran tidak dapat diproses |
| 409 | REFERENCE_CONFLICT | penawaran memiliki riwayat pesanan |
| 429 | AUTH_RATE_LIMIT | lebih dari 20 login gagal dalam satu jendela |
| 429 | REGISTRATION_RATE_LIMIT | lebih dari 50 request pendaftaran per 15 menit |

Batas login dan batas pendaftaran dihitung terpisah. Response 429 menyertakan header `Retry-After`.