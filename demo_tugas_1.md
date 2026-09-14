# Panduan & Naskah Demo Tugas 1 STSI4209 (Pemrograman Berbasis Web - UT)
**SITTA - Sistem Informasi Tiras dan Transaksi Bahan Ajar Universitas Terbuka**
*Ditujukan untuk: Mas Faiq (Tutor Online Program Studi Sistem Informasi)*

---

## 📌 Ringkasan Proyek & Target Penilaian (100 Poin)

| Kriteria Rubrik | Poin | Implementasi pada Proyek SITTA |
| :--- | :---: | :--- |
| **1.1. HTML Semantik & Valid** | 15 | Menggunakan elemen semantik modern: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<table>`, `<form>`, `<footer>`. Tidak memakai `div soup`. |
| **1.2. Desain CSS** | 15 | Menerapkan 3 jenis CSS:<br>• **External**: `css/style.css`<br>• **Internal**: `<style>` pada `<head>` di `dashboard.html`<br>• **Inline**: `style="..."` pada elemen tertentu. |
| **1.3. JavaScript DOM** | 25 | • Event handling (click, input, submit, keyup)<br>• Manipulasi DOM dinamis (tambah baris tabel dengan `createElement`, remove baris tabel)<br>• Modal box popup (Lupa Password & Daftar Akun)<br>• Alert box interaktif. |
| **1.4. Validasi Form & Alert** | 15 | • Validasi email & password kosong / format email salah.<br>• Pesan alert sesuai soal: *"email/password yang anda masukkan salah"*. Highlight border merah (`.error`) dan pesan error kontekstual. |
| **1.5. Modularitas File** | 5 | Struktur file bersih sesuai panduan soal:<br>`index.html`, `dashboard.html`, `tracking.html`, `stok.html`, folder `css/`, dan folder `js/` (`data.js`, `login.js`, `dashboard.js`, `tracking.js`, `stok.js`). |
| **1.6. Kreativitas Tambahan** | 10 | • Fitur **Dark Mode Toggle** dengan persistensi `localStorage`.<br>• **Filter Pencarian Real-time** pada data stok bahan ajar.<br>• Status pengiriman dengan visual progress bar bertingkat (33%, 66%, 100%) dan badge warna.<br>• Riwayat perjalanan pengiriman (timeline tracking). |
| **1.7. Alur & Argumentasi Video** | 15 | Sistematika demo terstruktur, runut, dan mendidik dengan durasi ideal 10–14 menit (maksimal 15 menit). |

---

## 🎬 Skenario & Naskah Alur Demo (Estimasi 12 Menit)

```mermaid
graph LR
    A[01. Pembukaan & Struktur Folder] --> B[02. Halaman Login & Validasi]
    B --> C[03. Dashboard & Greeting Waktu]
    C --> D[04. Tracking Pengiriman & Progress Bar]
    D --> E[05. Stok Bahan Ajar & Manipulasi DOM]
    E --> F[06. Fitur Kreatif & Penutup]
```

### Segmen 1: Pembukaan & Struktur Proyek (Menit 00:00 – 02:00)
- **Tindakan**:
  - Tampilkan struktur folder proyek di code editor (VS Code / Antigravity).
- **Poin Penjelasan Tutor**:
  - *"Halo rekan-rekan mahasiswa UT, pada video ini saya akan mendemonstrasikan implementasi Tugas Praktik 1 Pemrograman Berbasis Web untuk sistem SITTA (Sistem Informasi Tiras dan Transaksi Bahan Ajar)."*
  - Tunjukkan kepatuhan struktur folder:
    - Root: `index.html` (halaman login), `dashboard.html`, `tracking.html`, `stok.html`.
    - `css/style.css` (external styling).
    - `js/data.js` (dummy data konstanta `dataBahanAjar`, `dataTracking`, `users`) dan file JS modular per halaman.
  - Tunjukkan bahwa data dummy di `js/data.js` memenuhi ketentuan soal tanpa back-end/database.

---

### Segmen 2: Halaman Login & Validasi Form (Menit 02:00 – 04:30)
- **Tindakan**:
  1. Buka `index.html` di browser.
  2. Klik **Masuk** dalam kondisi field kosong -> Tunjukkan validasi email tidak boleh kosong.
  3. Masukkan email salah `salah@ut.ac.id` dan password `123` -> Klik **Masuk**.
  4. Muncul alert box: *"Email/password yang anda masukkan salah"*.
  5. Klik tautan **Lupa password?** -> Muncul Modal Box (tutup dengan tombol silang `×`).
  6. Klik tombol **Daftar** -> Muncul Modal Box pendaftaran akun (tutup kembali).
  7. Masukkan akun valid dari `data.js`: `faiq@ut.ac.id` / `faiq123` (atau `admin@ut.ac.id` / `admin123`).
  8. Klik **Masuk** -> Berhasil redirect ke `dashboard.html`.
- **Poin Penjelasan Tutor**:
  - Jelaskan bagaimana form divalidasi via event `loginForm.addEventListener('submit', ...)` dan `e.preventDefault()`.
  - Jelaskan implementasi Modal Box murni CSS & JS DOM (toggle class `.active` tanpa library eksternal).
  - Jelaskan penyimpanan sesi sederhana via `localStorage.setItem('sitta_user', ...)`.

---

### Segmen 3: Dashboard & Greeting Dinamis (Menit 04:30 – 06:30)
- **Tindakan**:
  1. Tunjukkan banner greeting: *"Selamat Pagi/Siang/Sore/Malam, [Nama User]"*.
  2. Tunjukkan badge `UT Daerah` di header (sebagai contoh penerapan **Internal CSS** di tag `<style>`).
  3. Tunjukkan 4 Menu Utama dalam bentuk grid cards:
     - Informasi Bahan Ajar
     - Tracking Pengiriman
     - Laporan (dengan dropdown submenu: *Monitoring Progress DO* dan *Rekap Bahan Ajar*)
     - Histori Transaksi Bahan Ajar
  4. Klik tombol **🌙 (Dark Mode)** di kanan atas -> Halaman berubah menjadi tema gelap secara instan.
- **Poin Penjelasan Tutor**:
  - Jelaskan logika penentuan waktu lokal dengan objek `new Date().getHours()` di `dashboard.js`.
  - Tunjukkan submenu interaktif pada card Laporan menggunakan `.sub-menu.active`.

---

### Segmen 4: Tracking Pengiriman Bahan Ajar (Menit 06:30 – 09:00)
- **Tindakan**:
  1. Klik menu card **Tracking Pengiriman** (atau buka `tracking.html`).
  2. Masukkan nomor Delivery Order: `DO-001` lalu tekan Enter atau klik tombol **Lacak**.
  3. Tunjukkan elemen yang tampil dinamis dari `dataTracking`:
     - Nama Mahasiswa: `ROIKA HEPRIDA SITIO`
     - Nomor Identitas / NIK
     - Tanggal Kirim & Rute Pengiriman (`TANJUNGPANDAN -> PEMATANGSIANTAR`)
     - Badge Status warna & Progress Bar terisi 100% (status "Sampai")
     - Riwayat Perjalanan Paket (timeline interaktif)
     - Rincian Ekspedisi (`JNE`), Jenis Paket (`Paket Lengkap`), Total Pembayaran (`Rp 450.000`).
  4. Uji coba masukkan nomor DO yang tidak terdaftar (misal `DO-999`) -> Tunjukkan alert penanganan error yang ramah pengguna.
  5. Klik tautan `← Kembali ke Dashboard`.
- **Poin Penjelasan Tutor**:
  - Jelaskan pencarian array object dengan JavaScript DOM.
  - Jelaskan simulasi visual status: progress bar width (33% untuk Diproses, 66% untuk Dikirim, 100% untuk Sampai).

---

### Segmen 5: Informasi Stok & Manipulasi Data Tabel DOM (Menit 09:00 – 11:30)
- **Tindakan**:
  1. Klik menu **Informasi Bahan Ajar** (buka `stok.html`).
  2. Tunjukkan tabel data bahan ajar yang ter-render dinamis dari konstanta `dataBahanAjar`.
  3. Coba fitur pencarian: ketik kode atau nama modul (misal `Komunikasi` atau `MKDU`) -> Tabel langsung menyaring data secara real-time.
  4. Klik tombol **+ Tambah Baris Stok Baru**.
  5. Isi data modul baru:
     - Kode Lokasi: `OTMP06`
     - Kode Barang: `MSIM4201`
     - Nama Barang: `Sistem Operasi UT`
     - Jenis Barang: `BMP`
     - Edisi: `1`
     - Stok: `100`
  6. Klik **Simpan** -> Tunjukkan baris baru langsung tersisipkan ke tabel menggunakan manipulasi DOM (`document.createElement('tr')`, `appendChild()`), dan alert sukses muncul.
  7. Tunjukkan tombol aksi **Hapus** pada baris tabel -> Ketika diklik dan dikonfirmasi, baris terhapus dari DOM dan array.
- **Poin Penjelasan Tutor**:
  - Soroti bahwa penambahan baris tabel dilakukan murni lewat manipulasi DOM tanpa me-reload halaman (*Single Page Experience*).
  - Jelaskan logika validasi input stok sebelum dimasukkan ke array dan tabel.

---

### Segmen 6: Fitur Kreativitas & Penutup (Menit 11:30 – 13:00)
- **Tindakan**:
  1. Demonstrasikan konsistensi Dark Mode di semua halaman (Login, Dashboard, Tracking, Stok).
  2. Klik tombol **Logout** -> Menghapus session `localStorage` dan kembali ke halaman login.
- **Poin Penjelasan Tutor**:
  - Rangkum kembali penerapan HTML Semantik, 3 jenis CSS (external, internal, inline), validasi form, manipulasi DOM tabel, serta modularitas script.
  - Berikan motivasi dan tips kepada mahasiswa untuk mengerjakan tugas dengan teliti dan mengeksplorasi kreativitas UI/UX masing-masing.

---

## 🔑 Data Uji Coba Cepat (Cheatsheet untuk Rekaman)

### Akun Login (`js/data.js`):
- `faiq@ut.ac.id` / `faiq123` (Nama: Faiq Najib)
- `admin@ut.ac.id` / `admin123` (Nama: Admin UT)
- `mahasiswa@ut.ac.id` / `mahasiswa123` (Nama: Mahasiswa UT)

### Nomor Delivery Order (`DO`):
- `DO-001` (ROIKA HEPRIDA SITIO - Status: Sampai, JNE)
- `DO-002` (BUDI SANTOSO - Status: Dikirim, SiCepat)
- `DO-003` (SITI RAHAYU - Status: Diproses, J&T)
- `DO-999` (Contoh pengujian kasus DO tidak ditemukan)

### Tambah Stok Baru:
- Kode Lokasi: `OTMP06`
- Kode Barang: `MSIM4201`
- Nama Barang: `Sistem Operasi UT`
- Jenis: `BMP`, Edisi: `1`, Stok: `100`

---

## 🌐 Perintah Menjalankan Server Lokal
Untuk menjalankan server demo kapan saja di port 8000:
```bash
cd /home/orin/code/archive/tugas-1
python3 -m http.server 8000
```
Buka di browser: `http://localhost:8000/index.html`
