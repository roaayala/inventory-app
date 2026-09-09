import { body } from "express-validator";

export const productValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name must be filled")
    .isString()
    .withMessage("Product name must be a text")
    .isLength({ min: 6, max: 100 })
    .withMessage(
      "Product name at least 6 characters and maximum 100 characters long",
    ),

  body("sku")
    .trim()
    .notEmpty()
    .withMessage("Product SKU must be filled")
    .isString()
    .withMessage("Product SKU must be a text")
    .isLength({ min: 6, max: 16 })
    .withMessage(
      "Product SKU at least 6 characters and maximum 16 characters long",
    ),

  body("price")
    .notEmpty()
    .withMessage("Product price must be filled")
    .isInt({ min: 1 })
    .withMessage("Product price must be positif number")
    .toInt(),

  body("weight")
    .notEmpty()
    .withMessage("Product weight must be filled")
    .isInt({ min: 1 })
    .withMessage("Product weight must be positif number")
    .toInt(),

  body("categoryId")
    .notEmpty()
    .withMessage("Product category must be filled")
    .isString()
    .withMessage("Invalid product category ID"),

  body("brandId")
    .notEmpty()
    .withMessage("Product brand must be filled")
    .isString()
    .withMessage("Invalid product brand ID"),
];

export const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name must be filled")
    .isString()
    .withMessage("Category name must be a text")
    .isLength({ min: 2, max: 32 })
    .withMessage(
      "Category name at least 2 characters and maximum 32 characters long",
    ),
];

export const brandValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Brand name must be filled")
    .isString()
    .withMessage("Brand name must be a text")
    .isLength({ min: 2, max: 32 })
    .withMessage(
      "Brand name at least 2 characters and maximum 32 characters long",
    ),
];
