const Product = ({
  id,
  sku,
  name,
  price,
  weight,
  brandId,
  categoryIds,
  brand,
  categories,
}) => {
  return {
    id: id || crypto.randomUUID(),
    sku,
    name,
    price,
    weight,
    brandId: brandId || null,
    categoryIds: categoryIds || [],

    brand: brand || null,
    categories: categories || [],
  };
};

export default Product;
