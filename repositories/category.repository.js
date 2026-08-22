import { pool } from "../db/pool.js";
import { newPlaceholders } from "../utils/helpers.js";

export const findAll = async () => {
  const { rows } = await pool.query(
    `SELECT id, name, parent_id FROM categories`,
  );
  return rows;
};

export const findCategoryByIds = async (ids) => {
  if (!ids || ids.length === 0) return [];

  const placeholders = newPlaceholders(ids);

  const { rows } = await pool.query(
    `SElECT id, name, parent_id FROM categories WHERE id IN (${placeholders})`,
    ids,
  );

  return rows;
};
