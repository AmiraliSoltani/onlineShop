import { getAuthenticateToken } from "./authenticate";
import axios from "axios";

// Utility function to deduplicate items by unique attributes
function deduplicateItems(items) {
  return items.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.product._id === item.product._id &&
          t.size === item.size &&
          t.color === item.color
      )
  );
}

export async function addToFavourites(id) {
  try {
    const response = await axios.put(
      `http://localhost:8080/favourites/${id}`,
      {},
      {
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${getAuthenticateToken()}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("favoriteeeeeeeeeeeee", response.data);
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function removeFromFavourites(id) {
  try {
    const response = await axios.delete(
      `http://localhost:8080/favourites/${id}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${getAuthenticateToken()}`,
        },
      }
    );

    if (response.status === 204 || response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getFavourites() {
  try {
    const response = await axios.get("http://localhost:8080/favourites", {
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${getAuthenticateToken()}`,
      },
    });

    if (response.status === 200) {
      console.log("faaaaaaaaaaaaaaaaaaaaaaaaaaa", response.data);
      return deduplicateItems(response.data); // Deduplicate before returning
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function addToLastVisited(id) {
  try {
    console.log("hooooooooooooooooooooooooooooooooooo");
    const response = await axios.put(
      `http://localhost:8080/lastVisited/${id}`,
      {},
      {
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${getAuthenticateToken()}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("lastttttttttttttttttttttttt", response.data);
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function replaceLastSearches(newLastSearches) {
  try {
    const response = await axios.put(
      `http://localhost:8080/replaceLastSearches`,
      newLastSearches,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${getAuthenticateToken()}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Replaced last searches:", response.data);
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error replacing last searches:", error);
    return [];
  }
}


export async function replaceLastVisited(newLastVisitedProducts) {
  try {
    const response = await axios.put(
      `http://localhost:8080/replaceLastVisited`,
      newLastVisitedProducts,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${getAuthenticateToken()}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Replaced last visited products:", response.data);
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error replacing last visited products:", error);
    return [];
  }
}


export async function addToLastSearches(searchObject) {
  console.log("searchhhhhhhhhhhhhhh");
  try {
    const response = await axios.put(
      `http://localhost:8080/LastSearches/`,
      searchObject,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${getAuthenticateToken()}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("searchhhhhhhhhhhhhhh deleted", response.data);
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function removelastSearches() {
  try {
    const response = await axios.delete(
      `http://localhost:8080/LastSearches/`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${getAuthenticateToken()}`,
        },
      }
    );

    if (response.status === 204 || response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getLastSearches() {
  try {
    const response = await axios.get("http://localhost:8080/LastSearches", {
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${getAuthenticateToken()}`,
      },
    });

    if (response.status === 200) {
      console.log("faaaaaaaaaaaaaaaaaaaaaaaaaaa", response.data);
      return deduplicateItems(response.data); // Deduplicate before returning
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function removeFromLastVisited(id) {
  try {
    const response = await axios.delete(
      `http://localhost:8080/lastVisited/${id}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${getAuthenticateToken()}`,
        },
      }
    );

    if (response.status === 204 || response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getLastVisited() {
  try {
    const response = await axios.get("http://localhost:8080/lastVisited", {
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${getAuthenticateToken()}`,
      },
    });

    if (response.status === 200) {
      console.log("faaaaaaaaaaaaaaaaaaaaaaaaaaa", response.data);
      return deduplicateItems(response.data); // Deduplicate before returning
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function replaceShoppingCard(shoppingCard) {
  try {
    const deduplicatedShoppingCard = deduplicateItems(shoppingCard); // Deduplicate before sending
    const response = await axios.put(
      `http://localhost:8080/shoppingCard/`,
      deduplicatedShoppingCard,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${getAuthenticateToken()}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("last visited products:", response.data);
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function addToHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${getAuthenticateToken()}`,
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function removeFromHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${getAuthenticateToken()}`,
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function getHistory() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${getAuthenticateToken()}`,
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return deduplicateItems(data); // Deduplicate before returning
  } else {
    return [];
  }
}


