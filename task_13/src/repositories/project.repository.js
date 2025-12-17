import { pool } from "../lib/db.js";

export const findAll = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM projects ORDER BY created_at DESC"
  );
  return rows;
};

export const findById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM projects WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

export const create = async (project) => {
  const query = `
    INSERT INTO projects
    (id, title, start_date, end_date, description, language, image_src)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
  `;
  const values = [
    project.id,
    project.title,
    project.startDate,
    project.endDate,
    project.description,
    project.language,
    project.imageSrc,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const update = async (id, data) => {
  const query = `
    UPDATE projects
    SET title=$1, start_date=$2, end_date=$3,
        description=$4, language=$5, image_src=$6
    WHERE id=$7
    RETURNING *
  `;
  const values = [
    data.title,
    data.startDate,
    data.endDate,
    data.description,
    data.language,
    data.imageSrc,
    id,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const remove = async (id) => {
  await pool.query("DELETE FROM projects WHERE id=$1", [id]);
};
