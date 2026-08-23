import * as productService from "../services/product.service.js";
import * as categoryService from "../services/category.service.js";
import * as brandService from "../services/brand.service.js";
import { buildCategoryTree, stringifyPrice } from "../utils/helpers.js";

export const renderDashboard = async (_req, res) => {
  const products = await productService.getProducts();
  const categories = buildCategoryTree(await categoryService.getCategories());
  const brands = await brandService.getBrands();

  res.render("dashboard/index", {
    title: "Dashboard",
    products,
    categories,
    brands,
    stringifyPrice,
  });
};
