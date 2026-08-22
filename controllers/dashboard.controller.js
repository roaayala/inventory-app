import * as productService from "../services/product.service.js";
import * as categoryService from "../services/category.service.js";
import { stringifyPrice } from "../utils/helpers.js";

const buildCategoryTree = (arr) => {
  const tree = [];
  const lookup = {};

  arr.forEach((item) => {
    lookup[item.id] = { ...item, children: [] };
  });

  arr.forEach((item) => {
    if (item.parentId === null) {
      tree.push(lookup[item.id]);
    } else {
      lookup[item.parentId].children.push(lookup[item.id]);
    }
  });

  return tree;
};

export const renderDashboard = async (_req, res) => {
  const products = await productService.getProducts();
  const categories = await categoryService.getCategories();
  const nestedCategories = buildCategoryTree(categories);

  res.render("dashboard/index", {
    title: "Dashboard",
    products,
    nestedCategories,
    stringifyPrice,
  });
};
