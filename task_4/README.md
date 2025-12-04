# Portfolio & Project Showcase

Halaman web responsif untuk showcase portfolio pribadi. Dibangun menggunakan **HTML**, **Tailwind CSS**, dan **Font Awesome**, aplikasi ini memungkinkan pengguna untuk menampilkan profil mereka, menambahkan proyek dengan gambar, dan menghubungi pembuat.

## 🚀 Features

- **Home Page (index.html)**
  Menampilkan halaman utama dengan profil pribadi, bio singkat, dan link navigasi ke halaman lainnya.

- **My Projects Page (my-project.html)**
  Form interaktif untuk menambahkan proyek baru dengan fitur:
  - Input nama proyek (Project Name)
  - Tanggal mulai dan selesai (Start/End Date)
  - Deskripsi proyek lengkap
  - Pilihan bahasa pemrograman (JavaScript, TypeScript, C++, Golang)
  - Upload gambar proyek
  - Real-time preview gambar dengan FileReader API
  - Kartu proyek otomatis yang menampilkan image, judul, dan deskripsi
  
  Setiap kartu proyek menampilkan:
  - Gambar preview dari file yang diupload
  - Judul proyek
  - Deskripsi proyek
  - Tanggal dan bahasa pemrograman

- **Contact Page (contact-me.html)**
  Halaman untuk menghubungi pembuat dengan form kontak atau tautan sosial media.

- **Responsive Navigation**
  Menu navigasi tetap di atas (sticky navbar) dengan link ke Home, My Project, dan Contact Me.

## 🛠️ Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Font Awesome Icons
- Google Fonts (Poppins)
- Responsive Layout (Flexbox & Grid)

## 📁 Project Structure

```
/
├── index.html          # Halaman utama (Home)
├── my-project.html     # Halaman form tambah proyek & showcase
├── contact-me.html     # Halaman kontak
├── global.css          # Custom font utilities (Poppins)
├── utils/
│   └── index.js        # Script untuk form handling & project card generation
├── public/             # Folder untuk menyimpan gambar/aset
└── README.md           # Dokumentasi proyek
```

## ⚙️ How to Use

1. Clone repository:

```
git clone https://github.com/LuckyPrima/dumbways.git
cd task_4
```

2. Buka file berikut di browser:

```
index.html
```

Atau gunakan Live Server di VS Code untuk development lebih baik.

3. **Untuk menambah proyek:**
   - Klik menu "My Project" di navbar
   - Isi form dengan nama proyek, tanggal, deskripsi, bahasa, dan upload gambar
   - Klik "submit"
   - Proyek akan langsung muncul di kartu bawah form

4. **Untuk kontak:**
   - Klik menu "Contact Me" di navbar
   - Isi form kontak atau gunakan tautan sosial media

Tidak memerlukan server atau proses build tambahan.

## 🎨 Customization

Anda dapat melakukan penyesuaian berikut:

- Mengubah warna tema Tailwind di HTML files
- Menambah lebih banyak bahasa pemrograman di dropdown `#language`
- Mengubah styling kartu proyek di `utils/index.js` (fungsi `buildCard`)
- Menambah validasi form (ukuran file, tipe file, dll)
- Menambahkan fitur localStorage untuk persist data antar session
- Menambahkan fitur edit/delete proyek
- Mengganti font atau icon pack
- Menambahkan section atau halaman baru

Tailwind CSS membuat penyesuaian sangat cepat dan fleksibel.

## 📄 License

Proyek ini menggunakan **MIT License**, dan bebas digunakan, dimodifikasi, maupun dikembangkan lebih lanjut.
