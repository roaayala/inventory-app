import CategoryBase from "./category.base.js";

const CategoryDTO = ({ parent, products, brands, ...baseProps }) => {
  return {
    ...CategoryBase(baseProps),
    parent: parent || null,
    products: products || [],
    brands: brands || [],
  };
};

export default CategoryDTO;
