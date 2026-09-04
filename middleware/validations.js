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
    .isUUID()
    .withMessage("Invalid product category ID"),

  body("brandId")
    .notEmpty()
    .withMessage("Product brand must be filled")
    .isUUID()
    .withMessage("Invalid product brand ID"),
];
