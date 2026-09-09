export class BrandEntity {
  constructor(entity) {
    this.id = entity.id || crypto.randomUUID();
    this.name = entity.name;
  }
}

export const BrandRequestDTO = (reqBody) => {
  return {
    name: reqBody.name,
  };
};

export const BrandResponseDTO = (brandEntity, productTotal) => {
  if (productTotal === null) {
    return {
      id: brandEntity.id,
      name: brandEntity.name,
    };
  }

  return {
    id: brandEntity.id,
    name: brandEntity.name,
    productTotal,
  };
};
