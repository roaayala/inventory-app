import CategoryBase from "../models/category.base.js";
import * as categoryRepo from "../repositories/category.repository.js";

export const getCategories = async () => {
  const rawCategories = await categoryRepo.findAll();

  const formatedCategories = await Promise.all(
    rawCategories.map(async (cat) => {
      const productTotal = await categoryRepo.productsCountInCategory(cat.id);

      return {
        ...CategoryBase(cat),
        productTotal,
      };
    }),
  );

  return formatedCategories;
};

export const getCategoriesCount = async () =>
  await categoryRepo.categoriesCount();
