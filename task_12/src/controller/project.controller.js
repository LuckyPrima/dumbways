import * as projectService from "../services/project.service.js";

// SSR
export const renderProjects = async (req, res) => {
  const projects = await projectService.getAll();
  res.render("my-project", { projects });
};

export const renderProjectDetail = async (req, res) => {
  const project = await projectService.getById(req.params.id);

  if (!project) {
    return res.status(404).send("Project not found");
  }

  res.render("project-details", { project });
};

export const renderEditProject = async (req, res) => {
  const project = await projectService.getById(req.params.id);

  if (!project) {
    return res.status(404).send("Project not found");
  }

  res.render("edit-project", { project });
};

// API
export const getAllProjects = async (req, res) => {
  res.json(await projectService.getAll());
};

export const getProjectById = async (req, res) => {
  res.json(await projectService.getById(req.params.id));
};

export const createProject = async (req, res) => {
  const project = await projectService.create(req.body);
  res.json(project);
};

export const updateProject = async (req, res) => {
  const project = await projectService.update(req.params.id, req.body);
  res.json(project);
};

export const deleteProject = async (req, res) => {
  await projectService.remove(req.params.id);
  res.json({ success: true });
};
