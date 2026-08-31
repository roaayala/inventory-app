import BrandBase from "../models/brand.base.js";
import * as brandRepo from "../repositories/brand.repository.js";

export const getBrands = async () => {
  const rawBrands = await brandRepo.findAll();

  const formatedBrands = await Promise.all(
    rawBrands.map(async (brand) => {
      const productTotal = await brandRepo.productsCountInBrand(brand.id);
      return {
        ...BrandBase(brand),
        productTotal,
      };
    }),
  );

  return formatedBrands;
};

export const getBrandsCount = async () => await brandRepo.brandsCount();
