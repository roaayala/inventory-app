const ProductBase = ({ id, sku, name, price, weight }) => {
  return {
    id: id || crypto.randomUUID(),
    sku,
    name: name || "Empty Product",
    price,
    weight,
  };
};

export default ProductBase;
