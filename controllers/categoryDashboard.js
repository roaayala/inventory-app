import * as categoryService from "../services/category.service.js";

import { CONSTANTS, setNotification } from "../utils/helpers.js";
import { validationResult } from "express-validator";
import { CategoryRequestDTO } from "../models/Category.js";

const dashboardMenu = CONSTANTS.DASHBOARD_MENU;

export const renderCategoriesDashboard = async (_req, res) => {
  const result = await categoryService.getCategories();

  res.status(result.statusCode).render("dashboard/categories", {
    title: "Categories Dashboard",
    categories: result.data,
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

  const createResult = await categoryService.createCategory(newCategory);

  setNotification({
    res,
    key: "flash_notification",
    value: { success: createResult.success, message: createResult.message },
  });

  res.redirect("/dashboard/categories");
};

export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  const result = await categoryService.deleteCategory(categoryId);

  if (!result.success) {
    setNotification({
      res,
      key: "flash_notification",
      value: { success: result.success, message: result.message },
    });
    return res.redirect("/dashboard/categories");
  }

  setNotification({
    res,
    key: "flash_notification",
    value: { success: result.success, message: result.message },
  });

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

  const updateResult = await categoryService.updateCategory(req.body);

  setNotification({
    res,
    key: "flash_notification",
    value: { success: updateResult.success, message: updateResult.message },
  });

  res.redirect("/dashboard/categories");
};
