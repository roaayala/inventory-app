export const newPlaceholders = (arr) =>
  arr.map((_, index) => `$${index + 1}`).join(", ");

export const stringifyPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) return "0";

  return new Intl.NumberFormat("id-ID").format(price);
};

export const buildCategoryTree = (arr) => {
  const tree = [];
  const lookup = {};

  arr.forEach((item) => {
    lookup[item.id] = { ...item, children: [] };
  });

  arr.forEach((item) => {
    if (item.parentId === null) {
      tree.push(lookup[item.id]);
    } else {
      lookup[item.parentId].children.push(lookup[item.id]);
    }
  });

  return tree;
};
