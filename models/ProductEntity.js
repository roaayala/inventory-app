export default class ProductEntity {
  constructor(entity) {
    this.id = entity.id || crypto.randomUUID();
    this.name = entity.name;
    this.sku = entity.sku;
    this.price = entity.price;
    this.weight = entity.weight;
    this.brandId = entity.brand_id || entity.brandId || null;
  }
}
