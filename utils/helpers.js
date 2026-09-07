export const newPlaceholders = (arr) =>
  arr.map((_, index) => `$${index + 1}`).join(", ");

export const stringifyPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) return "0";

  return new Intl.NumberFormat("id-ID").format(price);
};

export const CONSTANTS = {
  SYSTEM_DEFAULTS: {
    UNCATEGORIZED_ID: "uncategorized",
    NO_BRAND_ID: "no-brand",
  },
};
