const ProductEntity = (reqBody) => {
  return {
    name: reqBody.name,
    sku: reqBody.sku,
    price: reqBody.price,
    weight: reqBody.weight,
    brandId: reqBody.brandId || null,
  };
};

export default ProductEntity;
