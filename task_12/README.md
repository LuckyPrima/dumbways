# Task 11 - Portfolio Website dengan Express, PostgreSQL & Node-PG

Proyek aplikasi web portfolio untuk menampilkan dan mengelola project-project Anda menggunakan Express.js dengan database PostgreSQL dan node-pg. Proyek ini dikembangkan sebagai bagian dari latihan bootcamp DumbWays.

## 📋 Deskripsi Singkat

Aplikasi ini adalah portfolio website yang dibangun dengan:

- **Backend**: Express.js (Node.js framework)
- **Database**: PostgreSQL dengan node-pg driver
- **Template Engine**: Handlebars (HBS) untuk rendering HTML dinamis
- **Arsitektur**: MVC dengan separation antara Controller, Service, Repository, Routes, dan Views

Aplikasi menampilkan portfolio dengan fitur CRUD (Create, Read, Update, Delete) untuk mengelola projects yang tersimpan di database PostgreSQL.

## ✨ Fitur Utama

### Frontend Pages

- **Home** (`/home`) - Halaman utama portfolio
- **My Projects** (`/myproject`) - Daftar semua projects
- **Project Details** (`/project-details/:id`) - Detail project individual
- **Edit Project** (`/edit-project/:id`) - Form edit project
- **Contact Me** (`/contactme`) - Halaman kontak

### Backend APIs (RESTful)

- `GET /api/projects` - Ambil semua projects
- `GET /api/projects/:id` - Ambil project spesifik
- `POST /api/projects` - Buat project baru
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Hapus project

### Data Management

- Dummy data dengan 6 contoh project
- Setiap project memiliki: `id`, `title`, `startDate`, `endDate`, `description`, `language`, `imageSrc`

## 📋 Prerequisites

- **Node.js** (v14+ direkomendasikan)
- **npm** (termasuk saat menginstall Node.js)
- **PostgreSQL** (v12+ direkomendasikan)
- Database dapat di sesuaikan pada `src/lib/db.js`

## 🚀 Instalasi

1. Buka folder proyek di terminal:

   ```bash
   cd task_11
   ```

2. Install semua dependencies:
   ```bash
   npm install
   ```

Dependencies akan menginstall:

- `express` ^5.2.1 - Framework web
- `hbs` ^4.2.0 - Template engine
- `pg` ^8.16.3 - PostgreSQL client untuk Node.js
- `nodemon` ^3.1.11 (devDependency) - Auto-reload development

3. Pastikan PostgreSQL sudah berjalan dan buat database `stage1`:

   ```sql
   CREATE DATABASE stage1;
   ```

4. buat ENUM `project_language`:

   ```sql
   CREATE TYPE project_language AS ENUM (
      javascript,
      typescript,
      C++,
      golang
   );
   ```

5. Buat tabel projects di database (sesuaikan dengan struktur Anda):

   ```sql
   CREATE TABLE projects (
      id UUID PRIMARY KEY,
      title TEXT NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      description TEXT,
      language project_language NOT NULL,
      image_src TEXT,
      created_at TIMESTAMP DEFAULT NOW()
   );
   ```

6. Sesuaikan konfigurasi database di `src/lib/db.js` jika diperlukan:

   ```javascript
   export const pool = new Pool({
     host: "localhost",
     user: "postgres",
     password: "admin123", // Sesuaikan password Anda
     database: "stage1",
     port: 5432,
   });
   ```

## 🏃 Menjalankan Aplikasi

### Development Mode (dengan hot-reload)

```bash
npm run dev
```

### Production Mode

```bash
node index.js
```

Server akan berjalan di `http://localhost:8080`

**URLs untuk testing:**

- Home: `http://localhost:8080/home`
- My Projects: `http://localhost:8080/myproject`
- Contact Me: `http://localhost:8080/contactme`

## 📁 Struktur Project

```
task_11/
├── app.js                  # Entry point & main aplikasi
├── package.json            # Dependencies & scripts
├── README.md               # Dokumentasi ini
│
└── src/                    # Source folder
    ├── controller/         # Controller untuk handle logic bisnis
    │   ├── page.controller.js       # Handler untuk halaman
    │   └── project.controller.js    # Handler untuk project
    │
    ├── lib/                # Library & utilities
    │   └── db.js           # Konfigurasi PostgreSQL connection pool
    │
    ├── public/             # Static files
    │   ├── css/
    │   │   └── global.css
    │   └── js/
    │       ├── edit-project.js
    │       ├── my-project.js
    │       └── project-details.js
    │
    ├── repositories/       # Database query layer
    │   └── project.repository.js
    │
    ├── routes/             # Express routes
    │   ├── page.routes.js  # Routes untuk halaman (SSR)
    │   └── api.routes.js   # Routes untuk API (JSON)
    │
    ├── services/           # Business logic layer
    │   └── project.service.js
    │
    └── views/              # Handlebars template files
        ├── index.hbs           # Home page
        ├── my-project.hbs      # Projects list
        ├── project-details.hbs # Project detail view
        ├── edit-project.hbs    # Edit project form
        └── contact-me.hbs      # Contact page
```

## 🔌 Endpoints Detail

### Pages (Server-Side Rendering)

| Method | Path                   | Deskripsi                      |
| ------ | ---------------------- | ------------------------------ |
| GET    | `/home`                | Render halaman home            |
| GET    | `/myproject`           | Render list semua projects     |
| GET    | `/contactme`           | Render halaman kontak          |
| GET    | `/project-details/:id` | Render detail project tertentu |
| GET    | `/edit-project/:id`    | Render form edit project       |

### APIs (JSON Response)

| Method | Path                | Deskripsi            | Body                                                           |
| ------ | ------------------- | -------------------- | -------------------------------------------------------------- |
| GET    | `/api/projects`     | Ambil semua projects | -                                                              |
| GET    | `/api/projects/:id` | Ambil project by ID  | -                                                              |
| POST   | `/api/projects`     | Buat project baru    | `{title, startDate, endDate, description, language, imageSrc}` |
| PUT    | `/api/projects/:id` | Update project       | `{title?, startDate?, ...}` (partial update)                   |
| DELETE | `/api/projects/:id` | Hapus project        | -                                                              |

## 📝 Contoh Request API

### Get All Projects

```bash
curl http://localhost:8080/api/projects
```

### Get Project by ID

```bash
curl http://localhost:8080/api/projects/1
```

### Create New Project

```bash
curl -X POST http://localhost:8080/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "startDate": "2024-07-01",
    "endDate": "2024-08-01",
    "description": "Description",
    "language": "javascript",
    "imageSrc": "https://example.com/image.jpg"
  }'
```

### Update Project

```bash
curl -X PUT http://localhost:8080/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "description": "Updated description"
  }'
```

### Delete Project

```bash
curl -X DELETE http://localhost:8080/api/projects/1
```

## 🛠️ Teknologi yang Digunakan

- **Express.js** - Web framework untuk Node.js
- **PostgreSQL** - Relational database management system
- **node-pg (pg)** - PostgreSQL client untuk Node.js dengan connection pooling
- **Handlebars (HBS)** - Template engine untuk server-side rendering
- **ES Modules** - Modern JavaScript module system (`"type": "module"` di package.json)
- **Nodemon** - Auto-reload development tool

## 📚 Tech Stack

- Runtime: **Node.js**
- Language: **JavaScript (ES6+)**
- Backend Framework: **Express.js**
- Database: **PostgreSQL**
- DB Driver: **node-pg (pg)**
- Template Engine: **Handlebars**
- Package Manager: **npm**

## 🏗️ Arsitektur MVC

Project ini menggunakan arsitektur MVC yang terpisah:

### **Layer Structure:**

1. **Routes** (`src/routes/`)

   - Mendefinisikan HTTP endpoints dan routing logic
   - Mengarahkan request ke controller yang sesuai

2. **Controller** (`src/controller/`)

   - Menangani request dari client
   - Memanggil service untuk business logic
   - Mengembalikan response (HTML atau JSON)

3. **Service** (`src/services/`)

   - Menangani business logic aplikasi
   - Memanggil repository untuk database operations
   - Melakukan validasi dan transformasi data

4. **Repository** (`src/repositories/`)

   - Berinteraksi langsung dengan database
   - Membungkus semua query ke database
   - Mengembalikan data dari database

5. **Database Connection** (`src/lib/db.js`)
   - Konfigurasi connection pool PostgreSQL
   - Tersedia untuk digunakan di repository

## 🗄️ Database Connection Pool

Aplikasi menggunakan PostgreSQL connection pool dari node-pg untuk efisiensi:

```javascript
// src/lib/db.js
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "admin123",
  database: "stage1",
  port: 5432,
});
```

Connection pool ini digunakan di repository untuk menjalankan query ke database.
