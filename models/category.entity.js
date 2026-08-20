import CategoryBase from "./category.base.js";

const CategoryEntity = ({
  parentId,

  productIds,

  brandIds,
  ...baseProps
}) => {
  return {
    ...CategoryBase(baseProps),
    parentId: parentId || null,
    productIds: productIds || [],
    brandIds: brandIds || [],
  };
};

export default CategoryEntity;
