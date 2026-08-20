import ProductBase from "./product.base.js";

const ProductEntity = ({ brandId, categoryIds, ...baseProps }) => {
  return {
    ...ProductBase(baseProps),
    brandId: brandId || null,
    categoryIds: categoryIds || [],
  };
};

export default ProductEntity;
