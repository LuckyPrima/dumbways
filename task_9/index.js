import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";

// Fix __dirname untuk ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

// Set view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// Register helper
hbs.registerHelper("eq", function (a, b) {
  return a === b;
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Daftarkan folder static
app.use("/style", express.static(path.join(__dirname, "src/style")));
app.use("/js", express.static(path.join(__dirname, "src/js")));

// ===== DUMMY DATA =====
let projects = [
  {
    id: "1",
    title: "Portfolio Website",
    startDate: "2024-01-15",
    endDate: "2024-03-20",
    description:
      "Membangun website portfolio personal dengan React dan Tailwind CSS. Website ini menampilkan semua project yang telah saya buat selama bootcamp dengan design yang modern dan responsif.",
    language: "javascript",
    imageSrc:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    startDate: "2024-02-01",
    endDate: "2024-05-10",
    description:
      "Platform e-commerce lengkap dengan fitur shopping cart, payment gateway, dan admin dashboard. Menggunakan Node.js backend dengan MongoDB untuk database management yang efisien.",
    language: "typescript",
    imageSrc:
      "https://webandcrafts.com/_next/image?url=https%3A%2F%2Fadmin.wac.co%2Fuploads%2FWhat_is_E_commerce_and_What_are_its_Applications_2_d2eb0d4402.jpg&w=4500&q=90",
  },
  {
    id: "3",
    title: "Real-Time Chat Application",
    startDate: "2024-03-05",
    endDate: "2024-04-28",
    description:
      "Aplikasi chat real-time dengan Socket.io untuk komunikasi instant. Fitur termasuk user authentication, group chat, dan notification system yang terintegrasi dengan sempurna.",
    language: "javascript",
    imageSrc:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
  },
  {
    id: "4",
    title: "Weather Dashboard",
    startDate: "2024-01-20",
    endDate: "2024-02-15",
    description:
      "Dashboard cuaca interaktif yang mengambil data dari Weather API. Menampilkan forecast 7 hari, map interaktif, dan historical weather data dengan visualization yang menarik.",
    language: "javascript",
    imageSrc:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=200&fit=crop",
  },
  {
    id: "5",
    title: "Task Management System",
    startDate: "2024-04-01",
    endDate: "2024-06-15",
    description:
      "Sistem manajemen task dengan fitur kanban board, deadline tracking, dan team collaboration. Built dengan C++ backend untuk performa optimal dan database MySQL untuk data persistence.",
    language: "C++",
    imageSrc:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=200&fit=crop",
  },
  {
    id: "6",
    title: "Golang Microservices",
    startDate: "2024-05-10",
    endDate: "2024-07-20",
    description:
      "Arsitektur microservices menggunakan Golang dengan gRPC untuk komunikasi antar service. Implementasi Docker containerization dan Kubernetes orchestration untuk scalability tinggi.",
    language: "golang",
    imageSrc:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
  },
];

// ===== ROUTES =====

// Home Page
app.get("/home", (req, res) => {
  res.render("index");
});

// My Project Page (tampilkan semua projects)
app.get("/myproject", (req, res) => {
  res.render("my-project", { projects });
});

// Contact Me Page
app.get("/contactme", (req, res) => {
  res.render("contact-me");
});

// Edit Project Page
app.get("/edit-project/:id", (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).send("Project not found");
  }
  res.render("edit-project", { project });
});

// Project Details Page
app.get("/project-details/:id", (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).send("Project not found");
  }
  res.render("project-details", { project });
});

// API: Get all projects (for client-side)
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// API: Get project by ID
app.get("/api/projects/:id", (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json(project);
});

// API: Create new project
app.post("/api/projects", (req, res) => {
  const { title, startDate, endDate, description, language, imageSrc } =
    req.body;

  const newProject = {
    id: Date.now().toString(),
    title,
    startDate,
    endDate,
    description,
    language,
    imageSrc: imageSrc || "https://via.placeholder.com/400x200?text=No+Image",
  };

  projects.push(newProject);
  res.json(newProject);
});

// API: Update project
app.put("/api/projects/:id", (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  const { title, startDate, endDate, description, language, imageSrc } =
    req.body;

  project.title = title || project.title;
  project.startDate = startDate || project.startDate;
  project.endDate = endDate || project.endDate;
  project.description = description || project.description;
  project.language = language || project.language;
  project.imageSrc = imageSrc || project.imageSrc;

  res.json(project);
});

// API: Delete project
app.delete("/api/projects/:id", (req, res) => {
  const index = projects.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Project not found" });
  }

  const deleted = projects.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Home: http://localhost:${port}/home`);
  console.log(`My Projects: http://localhost:${port}/myproject`);
  console.log(`Contact: http://localhost:${port}/contactme`);
});
