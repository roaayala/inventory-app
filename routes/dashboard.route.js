import { Router } from "express";
import {
  brandValidation,
  categoryValidation,
  productValidation,
} from "../middleware/validations.js";
import * as dashboardController from "../controllers/dashboard.controller.js";

const dashboardRoute = Router();

dashboardRoute.get("/", dashboardController.renderDashboardIndex);

dashboardRoute.get("/products", dashboardController.renderDashboardProducts);

dashboardRoute.post(
  "/products",
  productValidation,
  dashboardController.postNewProduct,
);

dashboardRoute.get("/products/new", dashboardController.renderNewProductForm);

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

dashboardRoute.delete("/products/:id", dashboardController.deleteProduct);

dashboardRoute.delete("/categories/:id", dashboardController.deleteCategory);

dashboardRoute.get("/brands", dashboardController.renderDashboardBrands);

dashboardRoute.get("/brands/new", dashboardController.renderNewBrandForm);

dashboardRoute.post(
  "/brands",
  brandValidation,
  dashboardController.postNewBrand,
);

export default dashboardRoute;
