import { Router } from "express";
import {
  brandValidation,
  categoryValidation,
  productValidation,
} from "../middleware/validations.js";

import indexDashboardController from "../controllers/indexDashboard.js";
import productDashboardController from "../controllers/productDashboard.js";
import categoryDashboardController from "../controllers/categoryDashboard.js";
import brandDashboardController from "../controllers/brandDashboard.js";

const dashboardRouter = Router();

// INDEX
dashboardRouter.get("/", indexDashboardController.renderIndexDashboard);

// PRODUCTS
dashboardRouter.get(
  "/products",
  productDashboardController.renderProductsDashboard,
);
dashboardRouter.get("/products/new", productDashboardController.renderNewForm);

dashboardRouter.get(
  "/products/:id/edit",
  productDashboardController.renderEditForm,
);

dashboardRouter.post(
  "/products",
  productValidation,
  productDashboardController.postProduct,
);

dashboardRouter.delete(
  "/products/:id",
  productDashboardController.deleteProduct,
);

dashboardRouter.put(
  "/products/:id",
  productValidation,
  productDashboardController.updateProduct,
);

// CATEGORIES
dashboardRouter.get(
  "/categories",
  categoryDashboardController.renderCategoriesDashboard,
);

dashboardRouter.get(
  "/categories/new",
  categoryDashboardController.renderNewForm,
);

dashboardRouter.get(
  "/categories/:id/edit",
  categoryDashboardController.renderEditForm,
);

dashboardRouter.post(
  "/categories",
  categoryValidation,
  categoryDashboardController.postCategory,
);

dashboardRouter.delete(
  "/categories/:id",
  categoryDashboardController.deleteCategory,
);

dashboardRouter.put(
  "/categories/:id",
  categoryValidation,
  categoryDashboardController.updateCategory,
);

// BRANDS
dashboardRouter.get("/brands", brandDashboardController.renderBrandsDashboard);
dashboardRouter.get("/brands/new", brandDashboardController.renderNewForm);
dashboardRouter.get(
  "/brands/:id/edit",
  brandDashboardController.renderEditForm,
);

dashboardRouter.post(
  "/brands",
  brandValidation,
  brandDashboardController.postBrand,
);

dashboardRouter.put(
  "/brands/:id",
  brandValidation,
  brandDashboardController.updateBrand,
);

dashboardRouter.delete("/brands/:id", brandDashboardController.deleteBrand);

export default dashboardRouter;
