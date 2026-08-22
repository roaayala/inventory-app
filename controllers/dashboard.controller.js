import * as dashboardService from "../services/dashboard.service.js";
import { stringifyPrice } from "../utils/helpers.js";

export const getProducts = async (_req, res) => {
  const products = await dashboardService.getProducts();

  res.render("dashboard/index", {
    title: "Dashboard",
    products,
    stringifyPrice,
  });
};
