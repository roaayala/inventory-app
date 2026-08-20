import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller.js";

const dashboardRoute = Router();

dashboardRoute.get("/", dashboardController.getAllProduct);

export default dashboardRoute;
