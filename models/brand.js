const Brand = ({ id, name, productIds, products }) => {
  return {
    id: id || crypto.randomUUID(),
    name: name || "No Brand",

    productIds: productIds || [],

    products: products || [],
  };
};

export default Brand;
