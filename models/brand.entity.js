import BrandBase from "./brand.base.js";

const BrandEntity = ({ productIds, ...baseProps }) => {
  return {
    ...BrandBase(baseProps),
    productIds: productIds || [],
  };
};

export default BrandEntity;
