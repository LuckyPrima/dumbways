# Task 8

Proyek kecil menggunakan Express untuk tujuan latihan (DumbWays - Day 7).

**Deskripsi singkat:**

- Server HTTP sederhana dengan satu route `/` yang merespon dengan teks "Hello World!".

**Fitur**

- Endpoint GET `/` → menampilkan `Hello World!`

**Prerequisites**

- Node.js (v14+ direkomendasikan)
- npm (termasuk saat menginstall Node.js)

**Instalasi**

1. Clone repository atau unduh kode ke mesin Anda.
2. Buka folder proyek di terminal.
3. Install dependency:

```
npm install
```

Catatan: `package.json` sudah mencantumkan `express` sebagai dependency dan `nodemon` sebagai devDependency.

**Menjalankan aplikasi**

- Menjalankan langsung dengan Node:

```
node index.js
```

- Menjalankan dengan nodemon (hot-reload), jika ingin otomatis restart saat file berubah:

```
npm run dev
```

Perhatian: Script `dev` di `package.json` menunjuk ke `nodemon task_7/index.js`. Jika file `index.js` berada di root proyek (seperti pada repositori ini), Anda mungkin perlu mengubah script tersebut menjadi `nodemon index.js` atau jalankan `node index.js` seperti contoh di atas.

**Endpoint**

- `GET /` — Response: `Hello World!` (plain text)

**Struktur singkat proyek**

- `index.js` — entry point aplikasi (server Express sederhana)
- `package.json` — daftar dependency dan scripts
- `README.md` — dokumentasi ini

**Kontribusi**

- Silakan buat issue atau pull request jika ingin menambah fitur atau memperbaiki hal-hal kecil.

**Lisensi**

- Lisensi: `ISC` (sesuai `package.json`).

---

Jika kamu ingin, saya bisa:

- Memperbaiki `script.dev` di `package.json` agar menunjuk ke `index.js` yang benar.
- Menambahkan route atau contoh request lebih lengkap.

Beritahu saya langkah mana yang mau saya lanjutkan.
