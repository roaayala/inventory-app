import * as productService from "../services/product.service.js";
import * as categoryService from "../services/category.service.js";
import * as brandService from "../services/brand.service.js";
import { stringifyPrice } from "../utils/helpers.js";

export const renderDashboard = async (req, res) => {
  const { categories: categoriesQuery, brands: brandsQuery } = req.query;
  const activeFilters = {
    categories: Array.isArray(categoriesQuery)
      ? categoriesQuery
      : categoriesQuery
        ? [categoriesQuery]
        : [],
    brands: Array.isArray(brandsQuery)
      ? brandsQuery
      : brandsQuery
        ? [brandsQuery]
        : [],
  };

  const products = await productService.getProducts(activeFilters);
  const categories = await categoryService.getCategories();
  const brands = await brandService.getBrands();

  res.render("dashboard/index", {
    title: "Dashboard",
    products,
    categories,
    brands,
    activeFilters,
    stringifyPrice,
  });
};
