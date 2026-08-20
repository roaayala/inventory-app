import ProductBase from "./product.base.js";

const ProductEntity = ({ categoryIds, ...baseProps }) => {
  return {
    ...ProductBase(baseProps),
    categoryIds: categoryIds || [],
  };
};

export default ProductEntity;
