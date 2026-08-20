const CategoryBase = ({ id, name }) => {
  return {
    id: id || crypto.randomUUID(),
    name: name || "Others",
  };
};

export default CategoryBase;
