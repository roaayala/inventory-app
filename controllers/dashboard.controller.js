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

export const renderDashboardProducts = async (req, res) => {
  const { categories: categoriesQuery, brands: brandsQuery } = req.query;
  const activeFilters = {
    categories: categoriesQuery ? categoriesQuery : [],
    brands: brandsQuery ? brandsQuery : [],
  };

  const products = await productService.getProducts(activeFilters);
  const categories = await categoryService.getCategories();
  const brands = await brandService.getBrands();

  res.render("dashboard/products", {
    title: "Products Dashboard",
    products,
    categories,
    brands,
    activeFilters,
    dashboardMenu,
    activeMenu: dashboardMenu[1],
    stringifyPrice,
  });
};

export const renderNewProductForm = async (req, res) => {
  res.render("dashboard/item-form", {
    title: "Add New Product",
    dashboardMenu,
    activeMenu: dashboardMenu[1],
  });
};

export const renderDashboardCategories = async (_req, res) => {
  const categories = await categoryService.getCategories();

  res.render("dashboard/categories", {
    title: "Categories Dashboard",
    categories,
    dashboardMenu,
    activeMenu: dashboardMenu[2],
  });
};

export const renderDashboardBrands = async (_req, res) => {
  const brands = await brandService.getBrands();

  res.render("dashboard/brands", {
    title: "Brands Dashboard",
    brands,
    dashboardMenu,
    activeMenu: dashboardMenu[3],
  });
};
