import { CategoryEntity, CategoryResponseDTO } from "../models/Category.js";
import * as categoryRepo from "../repositories/category.repository.js";
import { CONSTANTS } from "../utils/helpers.js";
import serviceResult from "../utils/serviceResult.js";

export const getCategories = async () => {
  const categories = await categoryRepo.findAll();

  const formatedCategories = await Promise.all(
    categories.map(async (cat) => {
      const productTotal = await categoryRepo.productsCountInCategory(cat.id);

      return CategoryResponseDTO(cat, productTotal);
    }),
  );

  return formatedCategories;
};

export const getCategory = async (id) => {
  const brand = await categoryRepo.findOne(id);
  console.log(brand);

  if (CONSTANTS.SYSTEM_DEFAULTS.UNCATEGORIZED_ID === brand.id) {
    return serviceResult.forbidden({
      message: `"${brand.name}" forbidden to edit!`,
    });
  }

  const formatedBrand = CategoryResponseDTO(brand, null);

  return formatedBrand;
};

export const getCategoriesCount = async () =>
  await categoryRepo.categoriesCount();

export const createCategory = async (newItem) => {
  const newCategory = new CategoryEntity(newItem);

  await categoryRepo.insertCategory(newCategory);
};

export const deleteCategory = async (id) =>
  await categoryRepo.deleteCategory(id);

export const updateCategory = async (reqBody) => {
  const updateCategory = new CategoryEntity(reqBody);
  await categoryRepo.updateCategory(updateCategory);
};
