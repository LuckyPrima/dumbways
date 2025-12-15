import express from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";

const router = express.Router();

router.get("/projects", getAllProjects);
router.get("/projects/:id", getProjectById);
router.post("/projects", createProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

export default router;
