export class CategoryEntity {
  constructor(entity) {
    this.id = entity.id || crypto.randomUUID();
    this.name = entity.name;
  }
}

export const CategoryResponseDTO = (categoryEntity, productTotal) => {
  return {
    id: categoryEntity.id,
    name: categoryEntity.name,
    productTotal,
  };
};
