import * as productRepo from "../repositories/product.repository.js";
import * as brandRepo from "../repositories/brand.repository.js";
import * as categoryRepo from "../repositories/category.repository.js";
import ProductDTO from "../models/product.dto.js";
import BrandBase from "../models/brand.base.js";
import CategoryBase from "../models/category.base.js";

export const getProducts = async (filters = { categories: [], brands: [] }) => {
  const rawProducts = await productRepo.findAll();

  if (rawProducts.length === 0) return [];

  const productCategories = await productRepo.categoryIdsByProductIds(
    rawProducts.map((p) => p.id),
  );

  const filteredProducts = rawProducts.filter((product) => {
    const matchedBrand =
      filters.brands.length === 0 ||
      filters.brands.includes(String(product.brand_id));

    const mapCategories = productCategories
      .filter((pc) => pc.product_id === product.id)
      .map((pc) => String(pc.category_id));

    const matchedCategories =
      filters.categories.length === 0 ||
      filters.categories.some((catId) => mapCategories.includes(String(catId)));

    return matchedBrand && matchedCategories;
  });

  if (filteredProducts.length === 0) return [];

  const brandIds = filteredProducts.reduce((accumulator, current) => {
    if (!accumulator.includes(current.brand_id)) {
      accumulator = [...accumulator, current.brand_id];
      return accumulator;
    }
    return accumulator;
  }, []);

  const categoryIds = productCategories
    .filter((pc) => filteredProducts.some((p) => p.id === pc.product_id))
    .map((pc) => pc.category_id);
  console.log(categoryIds);

  const rawBrands = await brandRepo.findBrandByIds(brandIds);
  const rawCategories = await categoryRepo.findCategoryByIds(categoryIds);

  return filteredProducts.map((product) => {
    const matchedBrand = rawBrands.find(
      (brand) => brand.id === product.brand_id,
    );

    const productCatIds = productCategories
      .filter((pc) => pc.product_id === product.id)
      .map((pc) => pc.category_id);

    const matchedCategories = rawCategories.filter((cat) =>
      productCatIds.includes(cat.id),
    );

    return ProductDTO({
      ...product,
      brand: matchedBrand ? BrandBase(matchedBrand) : null,
      categories: matchedCategories.map((cat) =>
        CategoryBase({ id: cat.id, name: cat.name, parentId: cat.parent_id }),
      ),
    });
  });
};
