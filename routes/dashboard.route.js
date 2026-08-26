import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller.js";

const dashboardRoute = Router();

dashboardRoute.get("/", dashboardController.renderDashboardIndex);
dashboardRoute.get("/products", dashboardController.renderDashboard);
dashboardRoute.get("/categories", dashboardController.renderDashboard);
dashboardRoute.get("/brands", dashboardController.renderDashboard);

export default dashboardRoute;
