const Brand = ({ id, name, logoUrl }) => {
  return {
    id: id || crypto.randomUUID(),
    name: name || "No Brand",
  };
};

export default Brand;
