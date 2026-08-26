import * as productService from "../services/product.service.js";
import * as categoryService from "../services/category.service.js";
import * as brandService from "../services/brand.service.js";
import { stringifyPrice } from "../utils/helpers.js";

const dashboardMenu = [
  { label: "Index", link: "/dashboard", icon: "house" },
  { label: "Products", link: "/dashboard/products", icon: "box" },
  { label: "Categories", link: "/dashboard/categories", icon: "boxes" },
  { label: "Brands", link: "/dashboard/brands", icon: "crown" },
];

export const renderDashboardIndex = async (_req, res) => {
  const productsCount = await productService.getProductsCount();

  console.log(productsCount);
  res.render("dashboard/index", {
    title: "Dashboard",
    dashboardMenu,
    activeMenu: dashboardMenu[0],
  });
};

export const renderDashboard = async (req, res) => {
  const { categories: categoriesQuery, brands: brandsQuery } = req.query;
  const activeFilters = {
    categories: categoriesQuery ? categoriesQuery : [],
    brands: brandsQuery ? brandsQuery : [],
  };

  const products = await productService.getProducts(activeFilters);
  const categories = await categoryService.getCategories();
  const brands = await brandService.getBrands();

  res.render("dashboard/products", {
    title: "Dashboard",
    products,
    categories,
    brands,
    activeFilters,
    dashboardMenu,
    stringifyPrice,
  });
};
