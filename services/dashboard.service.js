import * as productRepo from "../repositories/product.repository.js";
import ProductDTO from "../models/product.dto.js";
import BrandBase from "../models/brand.base.js";
import ProductBase from "../models/product.base.js";
import CategoryBase from "../models/category.base.js";
export const allProduct = async () => {
  const rawProducts = await productRepo.findAll();

  const cleanProducts = rawProducts.map((product) =>
    ProductDTO({
      id: product.id,
      sku: product.sku,
      name: product.name,
      price: product.price,
      weight: product.weight,
      brand: product.brand_id
        ? BrandBase({ id: product.brand_id, name: product.brand_name })
        : null,
      categories: product.categories.map((cat) =>
        CategoryBase({ id: cat.id, name: cat.name, parentId: cat.parent_id }),
      ),
    }),
  );

  return cleanProducts;
};
