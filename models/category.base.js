const CategoryBase = ({ id, name }) => {
  return {
    id: id || crypto.randomUUID(),
    name,
  };
};

export default CategoryBase;
