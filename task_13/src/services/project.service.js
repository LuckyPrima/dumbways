import crypto from "crypto";
import * as repo from "../repositories/project.repository.js";

const formatDate = (date) => {
  if (!date) return null;
  return date.toISOString().split("T")[0];
};

const mapProject = (row) => ({
  id: row.id,
  title: row.title,
  startDate: formatDate(row.start_date),
  endDate: formatDate(row.end_date),
  description: row.description,
  language: row.language,
  imageSrc: row.image_src,
});

export const getAll = async () => {
  const rows = await repo.findAll();
  return rows.map(mapProject);
};

export const getById = async (id) => {
  const row = await repo.findById(id);
  return row ? mapProject(row) : null;
};

export const create = (data) => {
  return repo.create({
    id: crypto.randomUUID(),
    ...data,
    imageSrc:
      data.imageSrc || "https://via.placeholder.com/400x200?text=No+Image",
  });
};

export const update = (id, data) => {
  return repo.update(id, data);
};

export const remove = (id) => repo.remove(id);
