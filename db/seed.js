import { pool } from "./pool.js";
import Product from "../models/product.js";
import Brand from "../models/brand.js";
import Category from "../models/category.js";

const initialBrands = [
  Brand({ name: "Intel" }),
  Brand({ name: "Apple" }),
  Brand({ name: "Galax" }),
  Brand({}),
];

const initialCategories = [Category({})];

const initialProducts = [];
