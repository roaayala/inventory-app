import { CategoryEntity, CategoryResponseDTO } from "../models/Category.js";
import * as categoryRepo from "../repositories/category.repository.js";

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

export const getCategoriesCount = async () =>
  await categoryRepo.categoriesCount();

export const createCategory = async (newItem) => {
  const newCategory = new CategoryEntity(newItem);

  await categoryRepo.insertCategory(newCategory);
};

export const deleteCategory = async (id) =>
  await categoryRepo.deleteCategory(id);
