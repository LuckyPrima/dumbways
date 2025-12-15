import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import pageRouter from "./src/routes/page.routes.js";
import apiRouter from "./src/routes/api.routes.js";

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
app.use(express.static(path.join(__dirname, "src/public")));

// Routes
app.use(pageRouter);
app.use("/api", apiRouter);

// Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
