const CategoryBase = ({ id, name, parentId }) => {
  return {
    id: id || crypto.randomUUID(),
    name,
    parentId: parentId || null,
  };
};

export default CategoryBase;
