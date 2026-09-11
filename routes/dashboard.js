import { Router } from "express";
import {
  brandValidation,
  categoryValidation,
  productValidation,
} from "../middleware/validations.js";
import * as dashboardController from "../controllers/dashboard.js";

import * as indexDashboardController from "../controllers/indexDashboard.js";
import * as productDashboardController from "../controllers/productDashboard.js";

const dashboardRouter = Router();

// INDEX
dashboardRouter.get("/", indexDashboardController.renderDashboardIndex);

// PRODUCTS
dashboardRouter.get(
  "/products",
  productDashboardController.renderDashboardProducts,
);
dashboardRouter.get(
  "/products/new",
  productDashboardController.renderNewProductForm,
);

dashboardRouter.post(
  "/products",
  productValidation,
  productDashboardController.postNewProduct,
);

dashboardRouter.delete(
  "/products/:id",
  productDashboardController.deleteProduct,
);

// ==========================================
// 3. CATEGORIES ROUTES
// ==========================================
dashboardRouter.get(
  "/categories",
  dashboardController.renderDashboardCategories,
);

dashboardRouter.get(
  "/categories/new",
  dashboardController.renderNewCategoryForm,
);

dashboardRouter.get(
  "/categories/:id/edit",
  dashboardController.renderEditCategoryForm,
);

dashboardRouter.post(
  "/categories",
  categoryValidation,
  dashboardController.postNewCategory,
);

dashboardRouter.delete("/categories/:id", dashboardController.deleteCategory);

// ==========================================
// 4. BRANDS ROUTES
// ==========================================
dashboardRouter.get("/brands", dashboardController.renderDashboardBrands);
dashboardRouter.get("/brands/new", dashboardController.renderNewBrandForm);
dashboardRouter.get(
  "/brands/:id/edit",
  dashboardController.renderEditBrandForm,
);

dashboardRouter.post(
  "/brands",
  brandValidation,
  dashboardController.postNewBrand,
);

dashboardRouter.put(
  "/brands/:id",
  brandValidation,
  dashboardController.updateBrand,
);

dashboardRouter.delete("/brands/:id", dashboardController.deleteBrand);

export default dashboardRouter;
