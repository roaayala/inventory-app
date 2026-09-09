import { Router } from "express";
import {
  brandValidation,
  categoryValidation,
  productValidation,
} from "../middleware/validations.js";
import * as dashboardController from "../controllers/dashboard.controller.js";

const dashboardRoute = Router();

// ==========================================
// 1. DASHBOARD INDEX
// ==========================================
dashboardRoute.get("/", dashboardController.renderDashboardIndex);

// ==========================================
// 2. PRODUCTS ROUTES
// ==========================================
dashboardRoute.get("/products", dashboardController.renderDashboardProducts);
dashboardRoute.get("/products/new", dashboardController.renderNewProductForm);

dashboardRoute.post(
  "/products",
  productValidation,
  dashboardController.postNewProduct,
);

dashboardRoute.delete("/products/:id", dashboardController.deleteProduct);

// ==========================================
// 3. CATEGORIES ROUTES
// ==========================================
dashboardRoute.get(
  "/categories",
  dashboardController.renderDashboardCategories,
);
dashboardRoute.get(
  "/categories/new",
  dashboardController.renderNewCategoryForm,
);

dashboardRoute.post(
  "/categories",
  categoryValidation,
  dashboardController.postNewCategory,
);

dashboardRoute.delete("/categories/:id", dashboardController.deleteCategory);

// ==========================================
// 4. BRANDS ROUTES
// ==========================================
dashboardRoute.get("/brands", dashboardController.renderDashboardBrands);
dashboardRoute.get("/brands/new", dashboardController.renderNewBrandForm);
dashboardRoute.get("/brands/:id/edit", dashboardController.renderEditBrandForm);

dashboardRoute.post(
  "/brands",
  brandValidation,
  dashboardController.postNewBrand,
);

dashboardRoute.put(
  "/brands/:id",
  brandValidation,
  dashboardController.updateBrand,
);

dashboardRoute.delete("/brands/:id", dashboardController.deleteBrand);

export default dashboardRoute;
