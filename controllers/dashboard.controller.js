import * as dashboardService from "../services/dashboard.service.js";

export const getProducts = async (_req, res) => {
  const products = await dashboardService.getProducts();
  res.send(products);
};
