import { pool } from "../db/pool.js";
import { newPlaceholders } from "../utils/helpers.js";

export const findAll = async () => {
  const { rows } = await pool.query(
    `SELECT id, sku, name, price, weight, brand_id FROM PRODUCTS`,
  );

  return rows;
};

export const productsCount = async () => {
  const { rows } = await pool.query(`SELECT COUNT(*) FROM products`);

  return rows[0].count;
};

export const categoryIdsByProductIds = async (productIds) => {
  if (!productIds || productIds.length === 0) return [];

  const placeholders = newPlaceholders(productIds);

  const query = `SELECT category_id, product_id FROM product_category WHERE product_id IN (${placeholders})`;

  const { rows } = await pool.query(query, productIds);

  return rows.map((row) => ({
    productId: row.product_id,
    categoryId: row.category_id,
  }));
};

export const insertProduct = async (newItem, categoryId) => {
  // products
  console.log(newItem);
  // product_category
  console.log(categoryId);
};
