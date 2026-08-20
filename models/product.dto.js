import ProductBase from "./product.base.js";

const ProductDTO = ({ brand, categories, ...baseProps }) => {
  return {
    ...ProductBase(baseProps),
    brand: brand || null,
    categories: categories || [],
  };
};

export default ProductDTO;
