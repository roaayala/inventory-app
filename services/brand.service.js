import BrandBase from "../models/brand.base.js";
import * as brandRepo from "../repositories/brand.repository.js";

export const getBrands = async () => {
  const rawBrands = await brandRepo.findAll();

  const formatedBrands = rawBrands.map((brand) => BrandBase({ ...brand }));

  return formatedBrands;
};
