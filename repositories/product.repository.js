import { pool } from "../db/pool.js";
import { newPlaceholders } from "../utils/helpers.js";

export const findAll = async () => {
  const { rows } = await pool.query(
    `SELECT id, sku, name, price, weight, brand_id FROM PRODUCTS`,
  );

  return rows;
};

export const categoryIdsByProductIds = async (productIds) => {
  if (!productIds || productIds.length === 0) return [];

  const placeholders = newPlaceholders(productIds);

  const { rows } = await pool.query(
    `SELECT category_id, product_id FROM product_categories WHERE product_id IN (${placeholders})`,
    productIds,
  );

  return rows;
};
