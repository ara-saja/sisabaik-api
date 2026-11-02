# Hasil Uji Chapter 9 — Membangun Antarmuka dengan Vue

## Identitas
- Penguji: Zaharani Aulia Efendi
- Branch: feature/vue-components
- Commit: (diisi setelah commit, lihat dengan git log --oneline -1)
- Versi Node: v24.21.0
- Sumber data: fixture di memori browser, tanpa API dan PostgreSQL

## Hasil uji skenario (Langkah 12)
| No | Skenario | Ekspektasi | Hasil aktual |
| --- | --- | --- | --- |
| 1 | Halaman baru, mode pembeli | 3 kartu; 15 unit; 2 penyedia | 3 penawaran, 15 unit, 2 penyedia — sesuai |
| 2 | Pencarian LAPAU | 2 kartu milik Lapau Uni Rina |  |
| 3 | Pencarian tidak-ada-produk | Daftar kosong dan pesan "Belum ada makanan yang cocok" |  |
| 4 | Reset filter lalu pilih kategori roti | 1 kartu Paket Roti Sore |  |
| 5 | Pilih Paket Roti Sore | Panel Pilihan Anda mendapat fokus; stok tetap 6 |  |
| 6 | Beralih ke mode penyedia | 3 kartu Rina; 2 tersedia; 9 unit |  |
| 7 | Submit form kosong | Pesan kesalahan mendapat fokus; daftar tetap 3 |  |
| 8 | Harga normal 20000, harga penawaran 30000 | Pesan kesalahan harga; daftar tidak bertambah |  |
| 9 | Paket Gratis Latihan, harga normal 20000, penawaran 0, stok 2, aktif, waktu besok | Data Rina bertambah; form kosong; angka 4 / 3 / 11 |  |
| 10 | Kembali ke pembeli dan reset filter | 4 kartu; 17 unit; 2 penyedia |  |
| 11 | Beralih lagi ke penyedia | Form kosong, data baru masih ada |  |
| 12 | Refresh browser | 3 kartu; 15 unit; 2 penyedia |  |
| 13 | Logo, ilustrasi, dan badge | Aset tampil; harga 0 berlabel Gratis | Logo dan ilustrasi tampil; Sayur Layak Olah berlabel Gratis; badge Hemat 50% dan 52% — sesuai |
| 14 | Lebar 375, 768, 1280 px dan keyboard | Tidak ada scroll ke samping; fokus terlihat |  |
| 15 | Batas waktu (argumen 8 diubah ke 15 / 3600) | Setelah ±20 detik: 2 kartu, 11 unit |  |

## Validasi tambahan
| Input | Ekspektasi | Hasil aktual |
| --- | --- | --- |
| Stok 1.5 | Ditolak |  |
| Harga dikosongkan | Ditolak |  |
| Tanggal kemarin | Ditolak |  |
| Nama kurang dari 3 karakter | Ditolak |  |
| Harga penawaran 0 | Diterima |  |

## Aliran props dan emits
- App menyimpan data utama: daftar penawaran, pencarian, kategori, mode tampilan, dan pilihan.
- App mengirim data ke komponen anak melalui props, misalnya objek penawaran ke KartuPenawaran.
- Komponen anak tidak mengubah props. Anak mengirim event ke App:
  - KartuPenawaran mengirim event `pilih` berisi ID penawaran.
  - FilterPenawaran mengirim `ubah-pencarian`, `ubah-kategori`, dan `reset`.
  - FormPenawaran mengirim `simpan` berisi data form yang sudah valid.
- App menerima event, mengubah state, lalu