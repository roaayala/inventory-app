export const newPlaceholders = (arr) =>
  arr.map((_, index) => `$${index + 1}`).join(", ");
