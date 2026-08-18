const Brand = ({ id, name }) => {
  return {
    id: id || crypto.randomUUID(),
    name: name || "No Brand",
  };
};

export default Brand;
