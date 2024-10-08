export function getStarClasses(value, number) {
  let starClasses = `without__color number${number}`;
  if (value > 0) starClasses += " positive";
  return starClasses;
}

export function changeImage(product, index, color, Id) {
  console.log("mouse", index, color, Id)
  if (product.productPic[color] !== undefined) {
    console.log("yes we have that image!")
    let image = document.getElementById(Id);
    image.src = product.productPic[color];
  }
}

export function backToFirstImage(product, index, color, Id) {
  let image = document.getElementById(Id);
  image.src = product.productPic[Object.keys(product.productPic)[0]];
}

// export function getStars(comments) {
//   console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",comments)
//   let sum = 0;
//   let numbers = comments.length;
//   if (numbers === 0) return [0, 0, 0, 0, 0];
//   comments.map((c) => (sum += c.vote));
//   let finalAaverage = sum / numbers;
//   finalAaverage = finalAaverage.toFixed(1);
//   let showStar = [0, 0, 0, 0, 0];
//   for (let index = 0; index < showStar.length; index++) {
//     showStar[index] = finalAaverage;
//     finalAaverage -= 1;
//   }
//   console.log("byeeeeeeeeeeeeeeeeeeeee",showStar)

//   return showStar;
// }

export function getStars(comments) {
  console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", comments);

  let sum = 0;
  let numbers = comments.length;
  if (numbers === 0) return [0, 0, 0, 0, 0];

  comments.forEach((c) => {
    sum += c.vote;
  });
  console.log("sum", sum);

  let finalAaverage = sum / numbers;
  let showStar = [0, 0, 0, 0, 0];

  // Fill in stars based on the final average
  for (let index = 0; index < showStar.length; index++) {
    if (finalAaverage >= 1) {
      showStar[index] = 1;
    } else if (finalAaverage > 0) {
      showStar[index] = finalAaverage;
    }
    finalAaverage -= 1;
  }

  console.log("byeeeeeeeeeeeeeeeeeeeee", showStar);

  return showStar;
}


export function getPopularity(comments) {
  let sum = 0;
  let numbers = comments.length;
  if (numbers === 0) return [0, 0, 0, 0, 0];
  comments.map((c) => (sum += c.vote));
  let finalAaverage = sum / numbers;
  finalAaverage = finalAaverage.toFixed(1);
  return finalAaverage;
}

export function getPriceClasses(product) {
  let priceClasses = "poduct__price";
  priceClasses += product.off!=0 ? " discount__price" : "";
  // priceClasses += product.off && "discount__price";
  return priceClasses;
}

export function getcolors(product, allAttributeItemS) {
  console.log("wowallcolors","hi",product)
  console.log("wowallcolors","hi2",allAttributeItemS)

  let attribiuteItem = product.categoryAttributes;
  let items = [];
  attribiuteItem.map((a) => items.push(...a.items));
  let finalItem = items.map((a) => a.attItem);
  let unique = [...new Set(finalItem)];
  let result = [];
  allAttributeItemS.map((a) => {
    for (let index = 0; index < unique.length; index++) {
      if (unique[index] === a.id) {
        result.push(a);
      }
    }
  });
  let color = result.filter((a) => a.parentId === 1);
  console.log("wowallcolors3","hi3",color)

  return color;
}
export function checkForStock(product) {
  if (product !== undefined) {
    let total = 0;
    product.categoryAttributes.map((one) => {
      if (one.items[0].id === 1) total += one.count;
    });
    if (total === 0 || product.price == 0) {
      console.log("faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      return false;
    }
    if (total > 0) return true;
  }
}

export function getSize(product, allAttributeItemS) {
  let attribiuteItem = product.categoryAttributes;
  let items = [];
  attribiuteItem.map((a) => items.push(...a.items));
  let finalItem = items.map((a) => a.attItem);
  let unique = [...new Set(finalItem)];
  let result = [];
  allAttributeItemS.map((a) => {
    for (let index = 0; index < unique.length; index++) {
      if (unique[index] === a.id) {
        result.push(a);
      }
    }
  });
  let color = result.filter((a) => a.parentId === 2);
  return color;
}
export function getAttributes(product, allAttributeItemS, id) {
  let attribiuteItem = product.categoryAttributes;
  let items = [];
  attribiuteItem.map((a) => items.push(...a.items));
  let finalItem = items.map((a) => a.attItem);
  let unique = [...new Set(finalItem)];
  let result = [];
  allAttributeItemS.map((a) => {
    for (let index = 0; index < unique.length; index++) {
      if (unique[index] === a.id) {
        result.push(a);
      }
    }
  });
  let Attribut = result.filter((a) => a.parentId === id);
  return Attribut;
}

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
