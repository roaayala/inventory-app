export class CategoryEntity {
  constructor(entity) {
    this.id = entity.id || crypto.randomUUID();
    this.name = entity.name;
  }
}

export const CategoryRequestDTO = (reqBody) => {
  return {
    name: reqBody.name,
  };
};

export const CategoryResponseDTO = (categoryEntity, productTotal) => {
  if (productTotal === null) {
    return {
      id: categoryEntity.id,
      name: categoryEntity.name,
    };
  }

  return {
    id: categoryEntity.id,
    name: categoryEntity.name,
    productTotal,
  };
};
