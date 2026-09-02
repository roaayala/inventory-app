const ProductResponseDTO = ({ productEntity, categoryEntity, brandEntity }) => {
  return {
    id: productEntity.id,
    sku: productEntity.sku,
    name: productEntity.name,
    weight: productEntity.weight,
    price: productEntity.price,
    category: categoryEntity,
    brand: brandEntity,
  };
};

export default ProductResponseDTO;
