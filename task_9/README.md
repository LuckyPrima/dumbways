# Task 9 - Portfolio Website dengan Express & Handlebars

Proyek aplikasi web portfolio untuk menampilkan dan mengelola project-project Anda menggunakan Express.js dengan template engine Handlebars (HBS). Proyek ini dikembangkan sebagai bagian dari latihan bootcamp DumbWays.

## 📋 Deskripsi Singkat

Aplikasi ini adalah portfolio website yang dibangun dengan:

- **Backend**: Express.js (Node.js framework)
- **Template Engine**: Handlebars (HBS) untuk rendering HTML dinamis
- **Arsitektur**: MVC-like dengan separation antara views, static files, dan logic

Aplikasi menampilkan portfolio dengan fitur CRUD (Create, Read, Update, Delete) untuk mengelola projects.

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

## 🚀 Instalasi

1. Buka folder proyek di terminal:

   ```bash
   cd task_9
   ```

2. Install semua dependencies:
   ```bash
   npm install
   ```

Dependencies akan menginstall:

- `express` ^5.2.1 - Framework web
- `hbs` ^4.2.0 - Template engine
- `nodemon` ^3.1.11 (devDependency) - Auto-reload development

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
task_9/
├── index.js                 # Entry point & main logic aplikasi
├── package.json            # Dependencies & scripts
├── README.md               # Dokumentasi ini
│
└── src/                    # Source folder
    ├── js/                 # Static JavaScript files
    │   ├── index.js
    │   ├── my-project.js
    │   ├── project-details.js
    │   └── edit-project.js
    │
    ├── style/              # Static CSS files
    │   └── global.css
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
- **Handlebars (HBS)** - Template engine untuk server-side rendering
- **ES Modules** - Modern JavaScript module system (`"type": "module"` di package.json)
- **Nodemon** - Auto-reload development tool

## 📚 Tech Stack

- Runtime: **Node.js**
- Language: **JavaScript (ES6+)**
- Backend Framework: **Express.js**
- Template Engine: **Handlebars**
- Package Manager: **npm**
