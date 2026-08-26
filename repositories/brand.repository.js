import { pool } from "../db/pool.js";
import { newPlaceholders } from "../utils/helpers.js";

export const findAll = async () => {
  const { rows } = await pool.query(`SELECT id, name FROM brands`);

  return rows;
};

export const brandsCount = async () => {
  const { rows } = await pool.query(`SELECT COUNT(*) FROM brands`);

  return rows[0].count;
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
