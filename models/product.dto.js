import ProductBase from "./product.base.js";

const ProductDTO = ({ brand, categories, ...baseProps }) => {
  const baseProduct = ProductBase(baseProps);
  delete baseProduct.id;
  return {
    ...baseProduct,
    brand: brand || null,
    categories: categories || [],
  };
};

export default ProductDTO;
