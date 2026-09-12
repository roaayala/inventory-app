import { validationResult } from "express-validator";
import * as brandService from "../services/brand.service.js";
import { CONSTANTS } from "../utils/helpers.js";
import { BrandRequestDTO } from "../models/Brand.js";
const dashboardMenu = CONSTANTS.DASHBOARD_MENU;

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
  // error handling for restricted id

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
