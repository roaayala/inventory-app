import { pool } from "../db/pool.js";
import { newPlaceholders } from "../utils/helpers.js";

export const findAll = async () => {
  const { rows } = await pool.query(`SELECT id, name FROM categories`);
  return rows;
};

export const categoriesCount = async () => {
  const { rows } = await pool.query(`SELECT COUNT(*) AS total FROM categories`);
  return parseInt(rows[0].total);
};

export const productsCountInCategory = async (categoryId) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*) as total FROM product_category WHERE category_id = $1`,
    [categoryId],
  );

  return parseInt(rows[0].total);
};

export const findCategoryByIds = async (ids) => {
  if (!ids || ids.length === 0) return [];

  const placeholders = newPlaceholders(ids);

  const { rows } = await pool.query(
    `SElECT id, name FROM categories WHERE id IN (${placeholders})`,
    ids,
  );

  return rows;
};
