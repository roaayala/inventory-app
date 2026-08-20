import BrandBase from "./brand.base.js";

const BrandDTO = ({ products, ...baseProps }) => {
  return {
    ...BrandBase(baseProps),
    products: products || [],
  };
};

export default BrandDTO;
