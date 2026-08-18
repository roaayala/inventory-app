const Product = ({ id, sku, name, price, weight, brand, categories }) => {
  return {
    id: id || crypto.randomUUID(),
    sku,
    name,
    price,
    weight,
    brand: brand || null,
    categories: categories || [],
  };
};

export default Product;
