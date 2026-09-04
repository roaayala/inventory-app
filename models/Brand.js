export class BrandEntity {
  constructor(entity) {
    this.id = entity.id || crypto.randomUUID();
    this.name = entity.name;
  }
}

export const BrandResponseDTO = (brandEntity, productTotal) => {
  return {
    id: brandEntity.id,
    name: brandEntity.name,
    productTotal,
  };
};
