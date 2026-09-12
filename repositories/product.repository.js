import { pool } from "../db/pool.js";
import { newPlaceholders } from "../utils/helpers.js";

export const findAll = async () => {
  const { rows } = await pool.query(
    `SELECT id, sku, name, price, weight, brand_id FROM PRODUCTS`,
  );

  return rows;
};

export const findOne = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, sku, name, price, weight, brand_id FROM products WHERE id = $1`,
    [id],
  );

  return rows[0];
};

export const productsCount = async () => {
  const { rows } = await pool.query(`SELECT COUNT(*) AS total FROM products`);

  return parseInt(rows[0].total);
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
  const client = await pool.connect();

  try {
    // product
    const productQuery = `INSERT INTO products (id, name, sku, price, weight, brand_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

    const product = await pool.query(productQuery, [
      newItem.id,
      newItem.name,
      newItem.sku,
      newItem.price,
      newItem.weight,
      newItem.brandId,
    ]);

    const productId = product.rows[0].id;

    // product_category
    const productCategoryQuery = `INSERT INTO product_category (product_id, category_id) values ($1, $2) RETURNING product_id, category_id`;

    const productCategory = await pool.query(productCategoryQuery, [
      productId,
      categoryId,
    ]);

    await client.query("COMMIT");

    return {
      product: product.rows[0],
      productCategory: productCategory.rows[0],
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const deleteProduct = async (id) => {
  const client = await pool.connect();

  try {
    // product
    const productQuery = `DELETE FROM products WHERE id = $1 RETURNING id`;

    const product = await pool.query(productQuery, [id]);

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

export const updateProduct = async (newProductEntity, categoryId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const updateProductQuery = `UPDATE products
    SET name = $1, sku = $2, price = $3, weight = $4, brand_id = $5
    WHERE id = $6 
    RETURNING *
    `;

    const { rows: updateProductRows } = await client.query(updateProductQuery, [
      newProductEntity.name,
      newProductEntity.sku,
      newProductEntity.price,
      newProductEntity.weight,
      newProductEntity.brandId,
      newProductEntity.id,
    ]);

    const productId = updateProductRows[0].id;

    // delete old category relation
    await client.query("DELETE FROM product_category WHERE product_id = $1", [
      productId,
    ]);

    // insert new relation
    await client.query(
      "INSERT INTO product_category (product_id, category_id) VALUES ($1, $2)",
      [productId, categoryId],
    );

    await client.query("COMMIT");

    return updateProductRows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
