import CategoryBase from "../models/category.base.js";
import * as categoryRepo from "../repositories/category.repository.js";

export const getCategories = async () => {
  const rawCategories = await categoryRepo.findAll();

  const formatedCategories = rawCategories.map((cat) =>
    CategoryBase({ ...cat, parentId: cat.parent_id }),
  );
  return formatedCategories;
};

export const getCategoriesCount = async () =>
  await categoryRepo.categoriesCount();
