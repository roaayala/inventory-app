import * as productRepo from "../repositories/product.repository.js";
import * as brandRepo from "../repositories/brand.repository.js";
import * as categoryRepo from "../repositories/category.repository.js";

import { ProductEntity, ProductResponseDTO } from "../models/Product.js";
import { BrandEntity } from "../models/Brand.js";
import { CategoryEntity } from "../models/Category.js";

export const getProducts = async (filters = {}) => {
  const filterCategories = Array.isArray(filters.categories)
    ? filters.categories
    : filters.categories
      ? [filters.categories]
      : [];

  const filterBrands = Array.isArray(filters.brands)
    ? filters.brands
    : filters.brands
      ? [filters.brands]
      : [];

  const products = (await productRepo.findAll()).map((product) => {
    return new ProductEntity(product);
  });

  if (products.length === 0) return [];

  const productCategory = await productRepo.categoryIdsByProductIds(
    products.map((p) => p.id),
  );

  const filteredProducts = products.filter((product) => {
    const matchedBrand =
      filterBrands.length === 0 ||
      filterBrands.includes(String(product.brandId));

    const mapCategories = productCategory
      .filter((pc) => pc.productId === product.id)
      .map((pc) => String(pc.categoryId));

    const matchedCategories =
      filterCategories.length === 0 ||
      filterCategories.some((catId) => mapCategories.includes(String(catId)));

    return matchedBrand && matchedCategories;
  });

  if (filteredProducts.length === 0) return [];

  const brandIds = filteredProducts.reduce((accumulator, current) => {
    if (!accumulator.includes(current.brandId)) {
      accumulator = [...accumulator, current.brandId];
      return accumulator;
    }
    return accumulator;
  }, []);

  const categoryIds = productCategory
    .filter((pc) => filteredProducts.some((p) => p.id === pc.productId))
    .map((pc) => pc.categoryId);

  const brands = (await brandRepo.findBrandByIds(brandIds)).map(
    (brand) => new BrandEntity(brand),
  );

  const categories = (await categoryRepo.findCategoryByIds(categoryIds)).map(
    (category) => new CategoryEntity(category),
  );

  return filteredProducts.map((product) => {
    const brand = brands.find((b) => b.id === product.brandId) || null;

    const pivot = productCategory.find((pc) => pc.productId === product.id);

    const category = pivot
      ? categories.find((c) => c.id === pivot.categoryId) || null
      : null;

    return ProductResponseDTO({
      productEntity: product,
      brandEntity: brand,
      categoryEntity: category,
    });
  });
};

export const getProductsCount = async () => await productRepo.productsCount();

export const createProduct = async (newItem) => {
  const newProduct = new ProductEntity(newItem);

  const categoryId = newItem.categoryId;

  await productRepo.insertProduct(newProduct, categoryId);
};
