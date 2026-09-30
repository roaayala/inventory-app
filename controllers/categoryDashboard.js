import * as categoryService from "../services/category.service.js";

import { CONSTANTS, setNotification } from "../utils/helpers.js";
import { validationResult } from "express-validator";
import { CategoryRequestDTO } from "../models/Category.js";

const dashboardMenu = CONSTANTS.DASHBOARD_MENU;
export const renderCategoriesDashboard = async (req, res) => {
  const categories = await categoryService.getCategories();

  res.render("dashboard/categories", {
    title: "Categories Dashboard",
    categories,
    dashboardMenu,
    activeMenu: dashboardMenu[2],
  });
};

export const renderNewForm = async (_req, res) => {
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

export const renderEditForm = async (req, res) => {
  const categoryId = req.params.id;

  const result = await categoryService.getCategory(categoryId);

  if (!result.success) {
    setNotification({
      res,
      key: "flash_notification",
      value: { success: result.success, message: result.message },
    });

    return res.redirect("/dashboard/categories");
  }

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
    oldData: result.data,
  });
};

export const postCategory = async (req, res) => {
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

export const updateCategory = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).render("dashboard/item-form", {
      title: "Edit Category",
      dashboardMenu,
      activeMenu: dashboardMenu[2],
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
