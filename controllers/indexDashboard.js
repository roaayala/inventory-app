import * as productService from "../services/product.service.js";
import * as categoryService from "../services/category.service.js";
import * as brandService from "../services/brand.service.js";
import { CONSTANTS } from "../utils/helpers.js";

const dashboardMenu = CONSTANTS.DASHBOARD_MENU;

export const renderDashboardIndex = async (_req, res) => {
  const productsCount = await productService.getProductsCount();
  const categoriesCount = await categoryService.getCategoriesCount();
  const brandsCount = await brandService.getBrandsCount();

  res.render("dashboard/index", {
    title: "Home Dashboard",
    dashboardMenu,
    activeMenu: dashboardMenu[0],
    productsCount,
    categoriesCount,
    brandsCount,
  });
};
