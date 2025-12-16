import express from "express";
import { renderHome, renderContact } from "../controller/page.controller.js";
import {
  renderProjects,
  renderProjectDetail,
  renderEditProject,
} from "../controller/project.controller.js";

const router = express.Router();

router.get("/home", renderHome);
router.get("/contactme", renderContact);
router.get("/myproject", renderProjects);

router.get("/project-details/:id", renderProjectDetail);
router.get("/edit-project/:id", renderEditProject);

export default router;
