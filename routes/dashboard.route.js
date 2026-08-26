import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller.js";

const dashboardRoute = Router();

dashboardRoute.get("/", dashboardController.renderDashboardIndex);
dashboardRoute.get("/products", dashboardController.renderDashboardProducts);
dashboardRoute.get("/categories", dashboardController.renderDashboardProducts);
dashboardRoute.get("/brands", dashboardController.renderDashboardProducts);

export default dashboardRoute;
