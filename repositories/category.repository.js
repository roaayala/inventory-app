import { pool } from "../db/pool.js";
import { CONSTANTS, newPlaceholders } from "../utils/helpers.js";

export const findAll = async () => {
  const { rows } = await pool.query(`SELECT id, name FROM categories`);
  return rows;
};

export const findOne = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, name FROM categories WHERE id = $1`,
    [id],
  );

  return rows[0];
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

export const insertCategory = async (categoryEntity) => {
  const query = `INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING *`;
  const { rows } = await pool.query(query, [
    categoryEntity.id,
    categoryEntity.name,
  ]);

  return rows[0];
};

export const deleteCategory = async (id) => {
  const UNCATEGORIZED_ID = CONSTANTS.SYSTEM_DEFAULTS.UNCATEGORIZED_ID;

  if (id === UNCATEGORIZED_ID) {
    throw new Error("Uncategorized cannot be deleted.");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // move relation to uncategorized
    const copyRelationQuery = `
    INSERT INTO product_category (product_id, category_id)
    SELECT product_id, $1
    FROM product_category
    WHERE category_id = $2
    ON CONFLICT DO NOTHING;
    `;

    await client.query(copyRelationQuery, [UNCATEGORIZED_ID, id]);

    // remove old relation
    await client.query(`DELETE FROM product_category WHERE category_id = $1`, [
      id,
    ]);

    // delete main relation
    const deleteCategoryQuery = `DELETE FROM categories WHERE id = $1 RETURNING *`;

    const { rows } = await client.query(deleteCategoryQuery, [id]);

    if (rows.length === 0) {
      throw new Error(`Category with ID ${id} not found.`);
    }

    await client.query("COMMIT");

    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
