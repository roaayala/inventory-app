import * as productService from "../services/product.service.js";
import * as categoryService from "../services/category.service.js";
import * as brandService from "../services/brand.service.js";
import { buildCategoryTree, stringifyPrice } from "../utils/helpers.js";

export const renderDashboard = async (req, res) => {
  const products = await productService.getProducts();
  const categories = buildCategoryTree(await categoryService.getCategories());
  const brands = await brandService.getBrands();

  const activeFilters = { categories: [], brands: [] };
  const { categories: categoriesQuery, brands: brandsQuery } = req.query;
  activeFilters.categories = categoriesQuery ? categoriesQuery : [];
  activeFilters.brands = brandsQuery ? brandsQuery : [];

  res.render("dashboard/index", {
    title: "Dashboard",
    products,
    categories,
    brands,
    activeFilters,
    stringifyPrice,
  });
};
