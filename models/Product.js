export class ProductEntity {
  constructor(entity) {
    this.id = entity.id || crypto.randomUUID();
    this.name = entity.name;
    this.sku = entity.sku;
    this.price = entity.price;
    this.weight = entity.weight;
    this.brandId = entity.brand_id || entity.brandId || null;
  }
}

export const ProductRequestDTO = (reqBody) => {
  return {
    sku: reqBody.sku,
    name: reqBody.name,
    weight: reqBody.weight,
    price: reqBody.price,
    categoryId: reqBody.categoryId,
    brandId: reqBody.brandId,
  };
};

export const ProductResponseDTO = ({
  productEntity,
  categoryEntity,
  brandEntity,
}) => {
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
