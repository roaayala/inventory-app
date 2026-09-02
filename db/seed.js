#! /usr/bin/env node

import { pool } from "./pool.js";
import BrandEntity from "../models/BrandEntity.js";
import CategoryEntity from "../models/CategoryEntity.js";
import ProductEntity from "../models/ProductEntity.js";

async function main() {
  try {
    console.log("start");

    const createTable = `
      DROP TABLE IF EXISTS product_category CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS categories CASCADE;
      DROP TABLE IF EXISTS brands CASCADE;
      
      CREATE TABLE IF NOT EXISTS brands (
        id VARCHAR (255) PRIMARY KEY,
        name VARCHAR (255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL
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

      CREATE TABLE IF NOT EXISTS product_category (
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

    const brandLogitech = new BrandEntity({ name: "Logitech" });
    const brandSamsung = new BrandEntity({ name: "Samsung" });
    const brandNike = new BrandEntity({ name: "Nike" });
    const brandNoBrand = new BrandEntity({ name: "No Brand" });

    await pool.query(
      `INSERT INTO brands (id, name) VALUES ($1, $2), ($3, $4), ($5, $6), ($7, $8)`,
      [
        brandLogitech.id,
        brandLogitech.name,
        brandSamsung.id,
        brandSamsung.name,
        brandNike.id,
        brandNike.name,
        brandNoBrand.id,
        brandNoBrand.name,
      ],
    );
    console.log("seed dummy brands done");

    const catElectronics = new CategoryEntity({ name: "Electronics" });
    const catComputerParts = new CategoryEntity({ name: "Computer Parts" });
    const catClothes = new CategoryEntity({ name: "Clothes" });
    const catUncategorized = new CategoryEntity({ name: "Uncategorized" });

    await pool.query(
      `INSERT INTO categories (id, name) VALUES ($1, $2), ($3, $4), ($5, $6), ($7, $8)`,
      [
        catElectronics.id,
        catElectronics.name,

        catComputerParts.id,
        catComputerParts.name,

        catClothes.id,
        catClothes.name,

        catUncategorized.id,
        catUncategorized.name,
      ],
    );
    console.log("seed dummy categories done");

    const prodMouse = new ProductEntity({
      sku: "LOGI-MX3S-01",
      name: "Mouse Wireless MX Master 3S",
      price: 1500000,
      weight: 1,
      brandId: brandLogitech.id,
    });

    const prodMonitor = new ProductEntity({
      sku: "SAMS-CRV27-01",
      name: "Samsung Monitor Curved 27 Inch",
      price: 3200000,
      weight: 5,
      brandId: brandSamsung.id,
    });

    const prodSmartTV = new ProductEntity({
      sku: "SAMS-SMT60-01",
      name: "Samsung Smart TV 60 Inch",
      price: 7_800_000,
      weight: 8,
      brandId: brandSamsung.id,
    });

    const prodShoes = new ProductEntity({
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
      `INSERT INTO product_category (product_id, category_id) VALUES 
       ($1, $2),
       ($3, $4),
       ($5, $6),
       ($7, $8)`,
      [
        prodMouse.id,
        catComputerParts.id,
        prodMonitor.id,
        catComputerParts.id,
        prodSmartTV.id,
        catElectronics.id,
        prodShoes.id,
        catClothes.id,
      ],
    );

    console.log("seed dummy product_category done");

    console.log("Dummy data successfully seeded!");
  } catch (error) {
    console.error(`Fail to create db`, error);
  } finally {
    pool.end();
  }
}

main();
