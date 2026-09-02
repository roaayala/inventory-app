export default class BrandEntity {
  constructor(entity) {
    this.id = entity.id || crypto.randomUUID();
    this.name = entity.name;
  }
}
