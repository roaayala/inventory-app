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

  return serviceResult({
    success: true,
    statusCode: 200,
    message: "Success",
    data: formatedCategories,
  });
};

export const getCategory = async (id) => {
  const category = await categoryRepo.findOne(id);

  if (!category) {
    return serviceResult({
      success: false,
      statusCode: 404,
      message: "Category not found!",
    });
  }

  if (CONSTANTS.SYSTEM_DEFAULTS.UNCATEGORIZED_ID === category.id) {
    return serviceResult({
      success: false,
      statusCode: 403,
      message: `"${category.name}" forbidden to edit!`,
    });
  }

  const formattedCategory = CategoryResponseDTO(category, null);

  return serviceResult({
    success: true,
    statusCode: 200,
    message: "Success",
    data: formattedCategory,
  });
};

export const getCategoriesCount = async () =>
  await categoryRepo.categoriesCount();

export const createCategory = async (newItem) => {
  const newCategory = new CategoryEntity(newItem);

  const createCategory = await categoryRepo.insertCategory(newCategory);
  return serviceResult({
    success: true,
    statusCode: 200,
    message: `Category "${createCategory.name}" created successfully.`,
  });
};

export const deleteCategory = async (id) => {
  try {
    const deletedCategory = await categoryRepo.deleteCategory(id);

    return serviceResult({
      success: true,
      statusCode: 200,
      message: `Category "${deletedCategory.name}" deleted successfully`,
    });
  } catch (error) {
    return serviceResult({
      success: false,
      statusCode: 400,
      message: error.message,
    });
  }
};

export const updateCategory = async (reqBody) => {
  const updateCategory = new CategoryEntity(reqBody);

  const updatedCategory = await categoryRepo.updateCategory(updateCategory);

  return serviceResult({
    success: true,
    statusCode: 200,
    message: `Category "${updatedCategory.name}" updated successfully.`,
  });
};
