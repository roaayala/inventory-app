const Category = ({
  id,
  name,
  parentId,
  parent,
  productIds,
  products,
  brandIds,
  brands,
}) => {
  return {
    id: id || crypto.randomUUID(),
    name: name || "Others",

    parentId: parentId || null,
    productIds: productIds || [],
    brandIds: brandIds || [],

    parent: parent || null,
    products: products || [],
    brands: brands || [],
  };
};

export default Category;
