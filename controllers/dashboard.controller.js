import * as productService from "../services/product.service.js";
import * as categoryService from "../services/category.service.js";
import * as brandService from "../services/brand.service.js";
import { stringifyPrice } from "../utils/helpers.js";

const dashboardMenu = [
  { label: "Home", link: "/dashboard" },
  { label: "Products", link: "/dashboard" },
  { label: "Categories", link: "/dashboard/categories" },
  { label: "Brands", link: "/dashboard/brands" },
];

export const renderDashboard = async (req, res) => {
  const { categories: categoriesQuery, brands: brandsQuery } = req.query;
  const activeFilters = {
    categories: categoriesQuery ? categoriesQuery : [],
    brands: brandsQuery ? brandsQuery : [],
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
    dashboardMenu,
    stringifyPrice,
  });
};
