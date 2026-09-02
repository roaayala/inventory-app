export default class CategoryEntity {
  constructor(entity) {
    this.id = entity.id || crypto.randomUUID();
    this.name = entity.name;
  }
}
