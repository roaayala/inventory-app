import { pool } from "../db/pool.js";

export const findAll = async () => {
  const { rows } = await pool.query(`
    SELECT 
      products.id,
      products.sku,
      products.name,
      products.price,
      products.weight,
      products.brand_id,
      brands.name AS brand_name,
      COALESCE (
        json_agg(
          json_build_object('id', categories.id, 'name', categories.name, 'parent_id', categories.parent_id)
        ) FILTER (WHERE categories.id IS NOT NULL),
        '[]'
      ) AS categories
      FROM products
      LEFT JOIN brands ON products.brand_id = brands.id
      LEFT JOIN product_categories ON products.id = product_categories.product_id
      LEFT JOIN categories ON product_categories.category_id = categories.id
      GROUP BY products.id, brands.id, brands.name;
  `);

  return rows;
};
