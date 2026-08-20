const BrandBase = ({ id, name }) => {
  return {
    id: id || crypto.randomUUID(),
    name,
  };
};

export default BrandBase;
