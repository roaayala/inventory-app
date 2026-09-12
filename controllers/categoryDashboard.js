import * as categoryService from "../services/category.service.js";

import { CONSTANTS } from "../utils/helpers.js";
import { validationResult } from "express-validator";
import { CategoryRequestDTO } from "../models/Category.js";

const dashboardMenu = CONSTANTS.DASHBOARD_MENU;

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

  res.render("dashboard/item-form", {
    title: "Edit Category",
    dashboardMenu,
    activeMenu: dashboardMenu[2],
    prevPage: "/dashboard/categories",
    formUrlEndpoint: `/dashboard/categories/${req.params.id}?_method=PUT`,
    isProductForm: false,
    isEditForm: true,
    fieldNamePrefix: "Category",
    errors: [],
    oldData: category,
  });
};

export const updateCategory = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).render("dashboard/item-form", {
      title: "Edit Category",
      dashboardMenu,
      activeMenu: dashboardMenu[3],
      prevPage: "/dashboard/categories",
      formUrlEndpoint: `/dashboard/categories/${req.params.id}?_method=PUT`,
      isProductForm: false,
      isEditForm: true,
      fieldNamePrefix: "Category",
      errors: result.array(),
      oldData: req.body,
    });
  }

  await categoryService.updateCategory(req.body);

  res.redirect("/dashboard/categories");
};
