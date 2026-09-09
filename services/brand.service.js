import { BrandEntity, BrandResponseDTO } from "../models/Brand.js";

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

export const getBrand = async (id) => {
  const brand = await brandRepo.findOne(id);

  const formatedBrand = BrandResponseDTO(brand, null);

  return formatedBrand;
};

export const getBrandsCount = async () => await brandRepo.brandsCount();

export const createBrand = async (newItem) => {
  const newBrand = new BrandEntity(newItem);

  await brandRepo.insertBrand(newBrand);
};

export const deleteBrand = async (id) => await brandRepo.deleteBrand(id);

export const updateBrand = async (reqBody) => {
  const updatedBrand = new BrandEntity(reqBody);
  await brandRepo.updateBrand(updatedBrand);
};
