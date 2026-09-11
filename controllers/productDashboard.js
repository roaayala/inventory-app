import * as productService from "../services/product.service.js";
import * as categoryService from "../services/category.service.js";
import * as brandService from "../services/brand.service.js";
import { CONSTANTS, stringifyPrice } from "../utils/helpers.js";
import { validationResult } from "express-validator";
import { ProductRequestDTO } from "../models/Product.js";

const dashboardMenu = CONSTANTS.DASHBOARD_MENU;

export const renderDashboardProducts = async (req, res) => {
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

export const renderNewProductForm = async (_req, res) => {
  const categories = await categoryService.getCategories();
  const brands = await brandService.getBrands();

  res.render("dashboard/item-form", {
    title: "Add New Product",
    dashboardMenu,
    activeMenu: dashboardMenu[1],
    prevPage: "/dashboard/products",
    formUrlEndpoint: "/dashboard/products",
    isProductForm: true,
    isEditForm: false,
    fieldNamePrefix: "Product",
    categories,
    brands,
    errors: [],
    oldData: {},
  });
};

export const postNewProduct = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const categories = await categoryService.getCategories();
    const brands = await brandService.getBrands();

    return res.status(400).render("dashboard/item-form", {
      title: "Add New Product",
      dashboardMenu,
      activeMenu: dashboardMenu[1],
      prevPage: "/dashboard/products",
      formUrlEndpoint: "/dashboard/products",
      isProductForm: true,
      isEditForm: false,
      fieldNamePrefix: "Product",
      categories,
      brands,
      errors: result.array(),
      oldData: req.body,
    });
  }

  const newProduct = ProductRequestDTO(req.body);

  await productService.createProduct(newProduct);

  res.redirect("/dashboard/products");
};

export const deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.redirect("/dashboard/products");
};
