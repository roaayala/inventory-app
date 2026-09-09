import { pool } from "../db/pool.js";
import { CONSTANTS, newPlaceholders } from "../utils/helpers.js";

export const findAll = async () => {
  const { rows } = await pool.query(`SELECT id, name FROM brands`);

  return rows;
};

export const findOne = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, name FROM brands WHERE id = $1`,
    [id],
  );

  return rows[0];
};

export const findBrandByIds = async (brandIds) => {
  if (!brandIds || brandIds.length === 0) return [];

  const placeholders = newPlaceholders(brandIds);

  const { rows } = await pool.query(
    `SElECT id, name FROM brands WHERE id IN (${placeholders})`,
    brandIds,
  );

  return rows;
};

export const brandsCount = async () => {
  const { rows } = await pool.query(`SELECT COUNT(*) AS total FROM brands`);

  return parseInt(rows[0].total);
};

export const productsCountInBrand = async (brandId) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*) AS total FROM products WHERE brand_id = $1`,
    [brandId],
  );

  return parseInt(rows[0].total);
};

export const insertBrand = async (brandEntity) => {
  const query = "INSERT INTO brands (id, name) VALUES($1, $2) RETURNING *";

  const { rows } = await pool.query(query, [brandEntity.id, brandEntity.name]);

  return rows[0];
};

export const deleteBrand = async (id) => {
  const NO_BRAND_ID = CONSTANTS.SYSTEM_DEFAULTS.NO_BRAND_ID;

  if (id === NO_BRAND_ID) {
    throw new Error("No brand cannot be deleted.");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const updateBrandQuery = `UPDATE products SET brand_id = $1 WHERE brand_id = $2`;

    // update to no brand
    await client.query(updateBrandQuery, [NO_BRAND_ID, id]);

    // delete brand
    const { rows } = await client.query(
      `DELETE FROM brands WHERE id = $1 RETURNING *`,
      [id],
    );

    if (rows.length === 0) {
      throw new Error(`Brand with ID ${id} not found.`);
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

export const updateBrand = async (brandEntity) => {
  const query = "UPDATE brands SET name = $1 WHERE id = $2 RETURNING *";

  const { rows } = await pool.query(query, [brandEntity.name, brandEntity.id]);

  return rows[0];
};
