import { Router } from "express";
import { body } from "express-validator";
import * as dashboardController from "../controllers/dashboard.controller.js";

const dashboardRoute = Router();

dashboardRoute.get("/", dashboardController.renderDashboardIndex);

dashboardRoute.get("/products", dashboardController.renderDashboardProducts);
dashboardRoute.post("/products", dashboardController.postNewProduct);
dashboardRoute.get("/products/new", dashboardController.renderNewProductForm);

dashboardRoute.get(
  "/categories",
  dashboardController.renderDashboardCategories,
);

dashboardRoute.get("/brands", dashboardController.renderDashboardBrands);

export default dashboardRoute;
