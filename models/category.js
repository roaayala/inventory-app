const Category = ({ id, name, parentId, products, brands }) => {
  return {
    id: id || crypto.randomUUID(),
    name: name || "Others",
    parentId: parentId || null,
    products: products || [],
    brands: brands || [],
  };
};

export default Category;
