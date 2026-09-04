import { BrandResponseDTO } from "../models/Brand.js";

import * as brandRepo from "../repositories/brand.repository.js";

export const getBrands = async () => {
  const brands = await brandRepo.findAll();

  const formatedBrands = await Promise.all(
    brands.map(async (brand) => {
      const productTotal = await brandRepo.productsCountInBrand(brand.id);

      return BrandResponseDTO(brand, productTotal);
    }),
  );

  return formatedBrands;
};

export const getBrandsCount = async () => await brandRepo.brandsCount();
