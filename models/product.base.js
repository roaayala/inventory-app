const ProductBase = ({ id, sku, name, price, weight, brandId }) => {
  return {
    id: id || crypto.randomUUID(),
    name,
    sku,
    price,
    weight,
    brandId: brandId || null,
  };
};

export default ProductBase;
