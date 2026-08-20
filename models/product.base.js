const ProductBase = ({ id, sku, name, price, weight, brandId }) => {
  return {
    id: id || crypto.randomUUID(),
    sku,
    name,
    price,
    weight,
    brandId: brandId || null,
  };
};

export default ProductBase;
