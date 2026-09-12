import { Router } from "express";
import {
  brandValidation,
  categoryValidation,
  productValidation,
} from "../middleware/validations.js";

import * as indexDashboardController from "../controllers/indexDashboard.js";
import * as productDashboardController from "../controllers/productDashboard.js";
import * as categoryDashboardController from "../controllers/categoryDashboard.js";
import * as brandDashboardController from "../controllers/brandDashboard.js";

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

dashboardRouter.get(
  "/products/:id/edit",
  productDashboardController.renderEditProductForm,
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

dashboardRouter.put(
  "/products/:id",
  productValidation,
  productDashboardController.updateProduct,
);

// CATEGORIES

dashboardRouter.get(
  "/categories",
  categoryDashboardController.renderDashboardCategories,
);

dashboardRouter.get(
  "/categories/new",
  categoryDashboardController.renderNewCategoryForm,
);

dashboardRouter.get(
  "/categories/:id/edit",
  categoryDashboardController.renderEditCategoryForm,
);

dashboardRouter.post(
  "/categories",
  categoryValidation,
  categoryDashboardController.postNewCategory,
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
dashboardRouter.get("/brands", brandDashboardController.renderDashboardBrands);
dashboardRouter.get("/brands/new", brandDashboardController.renderNewBrandForm);
dashboardRouter.get(
  "/brands/:id/edit",
  brandDashboardController.renderEditBrandForm,
);

dashboardRouter.post(
  "/brands",
  brandValidation,
  brandDashboardController.postNewBrand,
);

dashboardRouter.put(
  "/brands/:id",
  brandValidation,
  brandDashboardController.updateBrand,
);

dashboardRouter.delete("/brands/:id", brandDashboardController.deleteBrand);

export default dashboardRouter;
