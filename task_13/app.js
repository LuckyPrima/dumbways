import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import session from "express-session";
import flash from "express-flash";

// Router
import pageRouter from "./src/routes/page.routes.js";
import apiRouter from "./src/routes/api.routes.js";
import authRouter from "./src/routes/auth.routes.js";

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

// View engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));
hbs.registerPartials(path.join(__dirname, "src/views/partials"));
hbs.registerHelper("eq", (a, b) => a === b);

// Session & Flash
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// Body parser
app.use(express.urlencoded({ extended: true }));

// Global user (navbar)
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use((req, res, next) => {
  const ignorePaths = ["/login", "/signup", "/logout"];

  if (
    req.method === "GET" &&
    !ignorePaths.includes(req.path) &&
    !req.path.startsWith("/css") &&
    !req.path.startsWith("/js") &&
    !req.path.startsWith("/images")
  ) {
    req.session.lastUrl = req.originalUrl;
  }

  next();
});

// Static files
app.use(express.static(path.join(__dirname, "src/public")));
// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use(pageRouter);
app.use(authRouter);
app.use("/api", apiRouter);

// Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
