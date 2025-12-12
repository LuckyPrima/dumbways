# Portfolio & Project Showcase

Aplikasi web responsif untuk menampilkan portofolio pribadi dan proyek dengan fitur CRUD lengkap. Dibangun dengan HTML5, CSS3, Tailwind CSS, dan Vanilla JavaScript dengan penyimpanan data menggunakan localStorage.

## 🚀 Fitur Utama

- **Halaman Utama (`index.html`)**: Profil singkat dengan navigasi dan tautan ke halaman proyek serta kontak.
- **My Projects (`my-project.html`)**: Form untuk menambahkan proyek baru dengan field: nama proyek, tanggal mulai/selesai, deskripsi, pilihan bahasa pemrograman, dan upload gambar.
- **Project Cards Dinamis**: Kartu proyek dibuat secara dinamis dari data localStorage menggunakan JavaScript, menampilkan gambar preview, judul, deskripsi singkat, tanggal, dan bahasa.
- **Upload & Preview Gambar**: Menggunakan `FileReader` API untuk menampilkan preview gambar real-time sebelum disimpan dalam format Base64.
- **Detail Proyek (`project-details.html`)**: Halaman detail lengkap untuk setiap proyek dengan URL parameter berbasis ID.
- **Edit Proyek (`edit-project.html`)**: Halaman untuk mengedit data proyek yang sudah ada dengan pre-filled form data.
- **Hapus Proyek**: Fitur delete dengan konfirmasi pengguna untuk setiap kartu proyek.
- **Contact Page (`contact-me.html`)**: Halaman kontak dengan form dan/atau tautan sosial media.
- **Persistensi Data**: Semua proyek disimpan di `localStorage` sehingga tetap tersimpan setelah refresh halaman.

## 🛠️ Tech Stack

- **HTML5**: Semantic markup untuk semua halaman.
- **CSS3 + Tailwind CSS**: Styling responsif menggunakan framework Tailwind dengan custom CSS di `global.css`.
- **JavaScript (ES6+)**: Vanilla JavaScript tanpa framework; event handling, localStorage API, FileReader API, dan UUID generation (`crypto.randomUUID()`).
- **FontAwesome**: Icon library untuk UI elements.

## 📁 Struktur Proyek

```
/
├── index.html                      # Halaman utama / home
├── my-project.html                 # Halaman daftar proyek & form tambah proyek
├── project-details.html            # Halaman detail proyek (dengan query param id)
├── edit-project.html               # Halaman edit proyek
├── contact-me.html                 # Halaman kontak
├── global.css                      # Custom CSS styles
├── utils/
│   ├── index.js                    # Logika CRUD proyek, form handling, render kartu proyek
│   ├── project-details.js          # Logika untuk halaman detail proyek
│   └── edit-project.js             # Logika untuk halaman edit proyek
├── public/                         # Folder untuk aset statis (opsional)
└── README.md                       # Dokumentasi proyek
```

## ⚙️ Cara Menjalankan / Menguji

### Opsi 1: Buka Langsung di Browser

- Buka file `index.html` langsung di browser (file:// protocol).

### Opsi 2: Menggunakan Live Server

- Gunakan ekstensi **Live Server** di VS Code untuk development yang lebih smooth.
- Klik "Go Live" pada file HTML mana pun, server lokal akan dibuka di `http://localhost:5500`.

## 📝 Cara Menggunakan Aplikasi

### Menambah Proyek Baru

1. Klik menu **"My Project"** di navbar atau navigasi ke `my-project.html`.
2. Isi form dengan data proyek:
   - **Nama Proyek**: Judul proyek Anda
   - **Tanggal Mulai & Selesai**: Format tanggal (mis. 2025-01-15)
   - **Deskripsi**: Penjelasan singkat proyek
   - **Bahasa**: Pilih bahasa pemrograman yang digunakan
   - **Upload Gambar**: Pilih file gambar untuk preview (opsional)
3. Klik **"Submit"** — proyek akan ditambahkan ke daftar dan disimpan di localStorage.

### Melihat Detail Proyek

1. Dari halaman "My Project", klik tombol **"Details"** pada kartu proyek.
2. Halaman detail akan menampilkan informasi lengkap proyek.

### Mengedit Proyek

1. Dari halaman "My Project", klik tombol **"Edit"** pada kartu proyek.
2. Form akan pre-filled dengan data proyek yang ada.
3. Ubah data sesuai kebutuhan dan klik **"Update"** untuk menyimpan perubahan.

### Menghapus Proyek

1. Dari halaman "My Project", klik tombol **"Delete"** pada kartu proyek.
2. Konfirmasi penghapusan — proyek akan dihapus dari localStorage.

## 💾 Penyimpanan Data

- Data proyek disimpan di browser menggunakan **localStorage** dengan key `"projects"`.
- Format data: Array of objects dengan struktur:
  ```javascript
  {
    id: "uuid-string",
    title: "Nama Proyek",
    startDate: "2025-01-15",
    endDate: "2025-01-20",
    description: "Deskripsi proyek",
    language: "JavaScript",
    imageSrc: "data:image/png;base64,..." // Base64 string atau null
  }
  ```
- Data akan tetap tersimpan setelah refresh browser hingga di-clear manual atau dihapus melalui aplikasi.

## 🔧 Fitur Teknis

- **UUID Generation**: Setiap proyek mendapat ID unik menggunakan `crypto.randomUUID()`.
- **FileReader API**: Mengkonversi file gambar ke Base64 untuk penyimpanan di localStorage.
- **URL Query Parameter**: Menggunakan `?id=<uuid>` untuk navigate ke halaman detail dan edit.
- **Filter & Map**: Fungsi render support filter callback untuk fleksibilitas display.
- **Responsive Design**: Menggunakan Tailwind CSS grid dan flex untuk tampilan responsif di semua ukuran layar.

## 🚀 Pengembangan Selanjutnya (Future Enhancements)

- Tambahkan validasi file (ukuran max, tipe file gambar saja).
- Implementasi soft delete atau archive proyek.
- Tambahkan sorting & filtering advanced (by language, date range, etc.).
- Export/Import data proyek ke JSON.
- Backend integration dengan API untuk persistensi data di server.
- Implementasi image optimization dan lazy loading.
- Tambahkan dark mode toggle.
