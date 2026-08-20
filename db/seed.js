#! /usr/bin/env node

import { pool } from "./pool.js";
import BrandBase from "../models/brand.base.js";
import CategoryBase from "../models/category.base.js";
import ProductBase from "../models/product.base.js";

async function main() {
  try {
    console.log("start");

    const createTable = `
      DROP TABLE IF EXISTS product_categories CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS categories CASCADE;
      DROP TABLE IF EXISTS brands CASCADE;
      
      CREATE TABLE IF NOT EXISTS brands (
        id VARCHAR (255) PRIMARY KEY,
        name VARCHAR (255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        parent_id VARCHAR(255),
        FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        sku VARCHAR(255) UNIQUE,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        weight INT NOT NULL,
        brand_id VARCHAR(255),
        FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS product_categories (
        product_id VARCHAR(255) NOT NULL,
        category_id VARCHAR(255) NOT NULL,
        PRIMARY KEY (product_id, category_id),
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      );
    `;

    await pool.query(createTable);
    console.log("table created");

    console.log("Seeding dummy data...");

    const brandLogitech = BrandBase({ name: "Logitech" });
    const brandSamsung = BrandBase({ name: "Samsung" });
    const brandNike = BrandBase({ name: "Nike" });

    await pool.query(
      `INSERT INTO brands (id, name) VALUES ($1, $2), ($3, $4), ($5, $6)`,
      [
        brandLogitech.id,
        brandLogitech.name,
        brandSamsung.id,
        brandSamsung.name,
        brandNike.id,
        brandNike.name,
      ],
    );
    console.log("seed dummy brands done");

    const catElectronics = CategoryBase({ name: "Electronics" });
    const catComputerParts = CategoryBase({ name: "Computer Parts" });
    const catMouse = CategoryBase({
      name: "Mouse",
      parentId: catComputerParts.id,
    });
    const catClothes = CategoryBase({ name: "Clothes" });

    await pool.query(
      `INSERT INTO categories (id, name, parent_id) VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9), ($10, $11, $12)`,
      [
        catElectronics.id,
        catElectronics.name,
        catElectronics.parentId,
        catComputerParts.id,
        catComputerParts.name,
        catComputerParts.parentId,
        catMouse.id,
        catMouse.name,
        catMouse.parentId,
        catClothes.id,
        catClothes.name,
        catClothes.parentId,
      ],
    );
    console.log("seed dummy categories done");

    const prodMouse = ProductBase({
      sku: "LOGI-MX3S-01",
      name: "Mouse Wireless MX Master 3S",
      price: 1500000,
      weight: 1,
      brandId: brandLogitech.id,
    });

    const prodMonitor = ProductBase({
      sku: "SAMS-CRV27-01",
      name: "Samsung Monitor Curved 27 Inch",
      price: 3200000,
      weight: 5,
      brandId: brandSamsung.id,
    });

    const prodSmartTV = ProductBase({
      sku: "SAMS-SMT60-01",
      name: "Samsung Smart TV 60 Inch",
      price: 7_800_000,
      weight: 8,
      brandId: brandSamsung.id,
    });

    const prodShoes = ProductBase({
      sku: "NIKE-RUN-01",
      name: "Nike Revolution Running Shoes",
      price: 850000,
      weight: 1,
      brandId: brandNike.id,
    });

    await pool.query(
      `INSERT INTO products (id, sku, name, price, weight, brand_id) VALUES 
       ($1, $2, $3, $4, $5, $6),
       ($7, $8, $9, $10, $11, $12),
       ($13, $14, $15, $16, $17, $18), 
       ($19, $20, $21, $22, $23, $24)`,
      [
        prodMouse.id,
        prodMouse.sku,
        prodMouse.name,
        prodMouse.price,
        prodMouse.weight,
        prodMouse.brandId,
        prodMonitor.id,
        prodMonitor.sku,
        prodMonitor.name,
        prodMonitor.price,
        prodMonitor.weight,
        prodMonitor.brandId,
        prodSmartTV.id,
        prodSmartTV.sku,
        prodSmartTV.name,
        prodSmartTV.price,
        prodSmartTV.weight,
        prodSmartTV.brandId,
        prodShoes.id,
        prodShoes.sku,
        prodShoes.name,
        prodShoes.price,
        prodShoes.weight,
        prodShoes.brandId,
      ],
    );
    console.log("seed dummy products done");

    await pool.query(
      `INSERT INTO product_categories (product_id, category_id) VALUES 
       ($1, $2),
       ($3, $4),
       ($5, $6),
       ($7, $8)`,
      [
        prodMouse.id,
        catMouse.id,
        prodMonitor.id,
        catComputerParts.id,
        prodSmartTV.id,
        catElectronics.id,
        prodShoes.id,
        catClothes.id,
      ],
    );

    console.log("seed dummy product_categories done");

    console.log("Dummy data successfully seeded!");
  } catch (error) {
    console.error(`Fail to create db`, error);
  } finally {
    pool.end();
  }
}

main();
