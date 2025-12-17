import express from "express";
import { renderHome, renderContact } from "../controller/page.controller.js";
import {
  renderProjects,
  renderProjectDetail,
  renderEditProject,
} from "../controller/project.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/home", renderHome);
router.get("/contactme", renderContact);
router.get("/myproject", requireAuth, renderProjects);

router.get("/project-details/:id", requireAuth, renderProjectDetail);
router.get("/edit-project/:id", requireAuth, renderEditProject);

export default router;
