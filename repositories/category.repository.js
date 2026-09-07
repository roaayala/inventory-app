import { pool } from "../db/pool.js";
import { CONSTANTS, newPlaceholders } from "../utils/helpers.js";

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
    throw new Error("Uncategorized category cannot be deleted.");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // set category for to uncategorid where product have relation to targeted category id
    const productQuery = `UPDATE product_category SET category_id = $1 WHERE category_id = $2`;

    const product = await client.query(productQuery, [UNCATEGORIZED_ID, id]);

    if (product.rows.length === 0) {
      throw new Error(`Product id ${id} not found.`);
    }

    // product_category
    const productCategoryQuery = `DELETE FROM product_category WHERE product_id = $1`;

    const productCategory = await pool.query(productCategoryQuery, [
      product.rows[0].id,
    ]);

    await client.query("COMMIT");

    return {
      product: product.rows[0],
      productCategory: productCategory.rows,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
