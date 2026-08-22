import * as productRepo from "../repositories/product.repository.js";
import * as brandRepo from "../repositories/brand.repository.js";
import * as categoryRepo from "../repositories/category.repository.js";
import ProductDTO from "../models/product.dto.js";
import BrandBase from "../models/brand.base.js";
import CategoryBase from "../models/category.base.js";

export const getProducts = async () => {
  const rawProducts = await productRepo.findAll();

  const productCategories = await productRepo.categoryIdsByProductIds(
    rawProducts.map((p) => p.id),
  );

  const brandIds = rawProducts.reduce((accumulator, current) => {
    if (!accumulator.includes(current.brand_id)) {
      accumulator = [...accumulator, current.brand_id];
      return accumulator;
    }
    return accumulator;
  }, []);

  const rawBrands = await brandRepo.findBrandByIds(brandIds);
  const rawCategories = await categoryRepo.findCategoryByIds(
    productCategories.map((item) => item.category_id),
  );

  const formatedProducts = rawProducts.map((product) => {
    const matchedBrand = rawBrands.find(
      (brand) => brand.id === product.brand_id,
    );

    const assignedCategoriesId = productCategories
      .filter((pc) => pc.product_id === product.id)
      .map((pc) => pc.category_id);

    const matchedCategories = rawCategories.filter((cat) =>
      assignedCategoriesId.includes(cat.id),
    );

    return ProductDTO({
      ...product,
      brand: matchedBrand ? BrandBase(matchedBrand) : null,
      categories: matchedCategories.map((cat) =>
        CategoryBase({ id: cat.id, name: cat.name, parentId: cat.parent_id }),
      ),
    });
  });

  return formatedProducts;
};
