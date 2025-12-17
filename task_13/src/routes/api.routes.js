import express from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/projects", requireAuth, getAllProjects);
router.get("/projects/:id", requireAuth, getProjectById);
router.post("/projects", requireAuth, upload.single("image"), createProject);
router.put("/projects/:id", requireAuth, upload.single("image"), updateProject);
router.delete("/projects/:id", requireAuth, deleteProject);

export default router;
