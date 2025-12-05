# Portfolio & Project Showcase

Halaman web responsif untuk menampilkan portofolio pribadi dan proyek. Dokumen ini telah diperbarui agar sesuai dengan struktur kode saat ini di workspace (file HTML/CSS/JS tanpa dependensi Tailwind).

## 🚀 Fitur Utama

- **Halaman Utama (`index.html`)**: Profil singkat, navigasi, dan tautan ke halaman proyek serta kontak.
- **My Projects (`my-project.html`)**: Form untuk menambahkan proyek baru; form menerima nama proyek, tanggal mulai/selesai, deskripsi, pilihan bahasa, dan image upload.
- **Project Cards**: Kartu proyek dibuat secara dinamis menggunakan JavaScript dari `utils/index.js` dan menampilkan gambar preview, judul, deskripsi, tanggal, dan bahasa.
- **Preview Gambar Real-time**: Menggunakan `FileReader` untuk menampilkan preview gambar yang di-upload sebelum disimpan.
- **Detail Proyek (`project-details.html`)**: Halaman detail yang ditunjang oleh `utils/project-details.js` untuk menampilkan informasi lengkap dari proyek.
- **Contact Page (`contact-me.html`)**: Form kontak sederhana dan/atau tautan sosial media.

## 🛠️ Tech Stack

- **HTML5**
- **CSS (custom)**: file utama `global.css` — tidak menggunakan Tailwind di workspace saat ini.
- **Vanilla JavaScript**: skrip-skrip berada di folder `utils/` (mis. `index.js`, `project-details.js`).

## 📁 Struktur Proyek

```
/
├── index.html
├── my-project.html
├── project-details.html
├── contact-me.html
├── global.css
├── utils/
│   ├── index.js            # Form handling, image preview, build project cards
│   └── project-details.js  # Logic untuk halaman detail proyek
└── public/                 # Folder untuk menyimpan gambar/aset yang diupload (opsional)
```

## ⚙️ Cara Menjalankan / Menguji

- Buka `index.html` langsung di browser.
- Untuk pengembangan cepat, gunakan ekstensi Live Server di VS Code.

## Cara Menambah Proyek (singkat)

1. Buka `my-project.html`.
2. Isi form: judul, tanggal mulai/selesai, deskripsi, pilih bahasa, upload gambar.
3. Klik tombol submit — JavaScript di `utils/index.js` akan membuat kartu proyek baru dan menampilkan preview.

Catatan: Data saat ini disimpan di memori (runtime) — belum ada persistensi localStorage atau backend.

## 🔧 Kustomisasi yang Direkomendasikan

- Tambahkan validasi ukuran/tipe file pada upload.
- Implementasikan `localStorage` untuk menyimpan proyek antar sesi.
- Tambahkan fitur edit/hapus kartu proyek.
- Integrasikan build dan tooling jika ingin migrasi ke Tailwind atau framework lain.
