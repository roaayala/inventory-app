import * as dashboardService from "../services/dashboard.service.js";

export const getAllProduct = async (req, res) => {
  const allProduct = await dashboardService.allProduct();
  res.send(allProduct);
};
