import * as productService from "../services/product.service.js";
import * as categoryService from "../services/category.service.js";
import * as brandService from "../services/brand.service.js";
import { CONSTANTS, stringifyPrice } from "../utils/helpers.js";
import { validationResult } from "express-validator";
import { ProductRequestDTO } from "../models/Product.js";
import { CategoryRequestDTO } from "../models/Category.js";
import { BrandRequestDTO } from "../models/Brand.js";

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

export const renderDashboardCategories = async (_req, res) => {
  const categories = await categoryService.getCategories();

  res.render("dashboard/categories", {
    title: "Categories Dashboard",
    categories,
    dashboardMenu,
    activeMenu: dashboardMenu[2],
  });
};

export const renderNewCategoryForm = async (_req, res) => {
  res.render("dashboard/item-form", {
    title: "Add New Category",
    dashboardMenu,
    activeMenu: dashboardMenu[2],
    prevPage: "/dashboard/categories",
    formUrlEndpoint: "/dashboard/categories",
    isProductForm: false,
    isEditForm: false,
    fieldNamePrefix: "Category",
    errors: [],
    oldData: {},
  });
};

export const postNewCategory = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).render("dashboard/item-form", {
      title: "Add New Category",
      dashboardMenu,
      activeMenu: dashboardMenu[2],
      prevPage: "/dashboard/categories",
      formUrlEndpoint: "/dashboard/categories",
      isProductForm: false,
      isEditForm: false,
      fieldNamePrefix: "Category",
      errors: result.array(),
      oldData: req.body,
    });
  }

  const newCategory = CategoryRequestDTO(req.body);

  await categoryService.createCategory(newCategory);

  res.redirect("/dashboard/categories");
};

export const deleteCategory = async (req, res) => {
  await categoryService.deleteCategory(req.params.id);

  res.redirect("/dashboard/categories");
};

export const renderEditCategoryForm = async (req, res) => {
  const category = await categoryService.getCategory(req.params.id);
  console.log(category);

  res.redirect("/dashboard/categories");
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

export const renderNewBrandForm = async (_req, res) => {
  res.render("dashboard/item-form", {
    title: "Add New Brand",
    dashboardMenu,
    activeMenu: dashboardMenu[3],
    prevPage: "/dashboard/brands",
    formUrlEndpoint: "/dashboard/brands",
    isProductForm: false,
    isEditForm: false,
    fieldNamePrefix: "Brand",
    errors: [],
    oldData: {},
  });
};

export const postNewBrand = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).render("dashboard/item-form", {
      title: "Add New Brand",
      dashboardMenu,
      activeMenu: dashboardMenu[3],
      prevPage: "/dashboard/brands",
      formUrlEndpoint: "/dashboard/brands",
      isProductForm: false,
      isEditForm: false,
      fieldNamePrefix: "Brand",
      errors: result.array(),
      oldData: req.body,
    });
  }

  const newBrand = BrandRequestDTO(req.body);

  await brandService.createBrand(newBrand);

  res.redirect("/dashboard/brands");
};

export const deleteBrand = async (req, res) => {
  await brandService.deleteBrand(req.params.id);
  res.redirect("/dashboard/brands");
};

export const renderEditBrandForm = async (req, res) => {
  const brand = await brandService.getBrand(req.params.id);

  res.render("dashboard/item-form", {
    title: "Edit Brand",
    dashboardMenu,
    activeMenu: dashboardMenu[3],
    prevPage: "/dashboard/brands",
    formUrlEndpoint: `/dashboard/brands/${req.params.id}?_method=PUT`,
    isProductForm: false,
    isEditForm: true,
    fieldNamePrefix: "Brand",
    errors: [],
    oldData: brand,
  });
};

export const updateBrand = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).render("dashboard/item-form", {
      title: "Edit Brand",
      dashboardMenu,
      activeMenu: dashboardMenu[3],
      prevPage: "/dashboard/brands",
      formUrlEndpoint: `/dashboard/brands/${req.params.id}?_method=PUT`,
      isProductForm: false,
      isEditForm: true,
      fieldNamePrefix: "Brand",
      errors: result.array(),
      oldData: req.body,
    });
  }

  await brandService.updateBrand(req.body);

  res.redirect("/dashboard/brands");
};
