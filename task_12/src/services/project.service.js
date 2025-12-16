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

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB (approx)

const isBase64TooLarge = (base64) => {
  const sizeInBytes =
    (base64.length * 3) / 4 -
    (base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0);

  return sizeInBytes > MAX_IMAGE_SIZE;
};

export const getAll = async () => {
  const rows = await repo.findAll();
  return rows.map(mapProject);
};

export const getById = async (id) => {
  const row = await repo.findById(id);
  return row ? mapProject(row) : null;
};

export const create = (data) => {
  if (data.imageSrc && isBase64TooLarge(data.imageSrc)) {
    throw new Error("Image size exceeds 2MB limit");
  }

  return repo.create({
    id: crypto.randomUUID(),
    ...data,
    imageSrc:
      data.imageSrc || "https://via.placeholder.com/400x200?text=No+Image",
  });
};

export const update = (id, data) => {
  if (data.imageSrc && isBase64TooLarge(data.imageSrc)) {
    throw new Error("Image size exceeds 2MB limit");
  }

  return repo.update(id, data);
};

export const remove = (id) => repo.remove(id);
