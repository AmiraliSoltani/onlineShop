export function findingChildren(id, categories) {
  let childIDs = [];
  let allChildIDs = [];
  let mainCat = categories.filter((c) => c.id === id);
  let IDs = [];
  IDs.push(...mainCat);
  allChildIDs.push(...mainCat);
  while (IDs.length > 0) {
    categories.map((c) => {
      for (let index = 0; index < IDs.length; index++) {
        if (c.parentId === IDs[index].id) childIDs.push(c);
      }
    });
    allChildIDs.push(...childIDs);
    IDs = childIDs;
    childIDs = [];
  }

  let allIDs = [];
  allChildIDs.map((c) => allIDs.push(c.id));
  return allIDs;
}

const initialState = { productOfOneCategory: [] };

const productReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case "getProductsOfOneCategory":
      let categories = action.data.allCategories;
      let allProducts = action.data.allProducts;
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkk", allProducts, categories,action.payload.id);

      id = action.payload.id;
      let IDs = findingChildren(id, categories);
      let categoryProducts = [];

      IDs.map((oneId) => {
        const filteredProducts = allProducts.filter(
          (P) => P.categoryId === oneId
        );
        categoryProducts.push(...filteredProducts);
      });
      categoryProducts = [...new Set(categoryProducts)];
      return {
        ...state,
        productOfOneCategory: categoryProducts,
      };

    default:
      return state;
  }
};

export default productReducer;
