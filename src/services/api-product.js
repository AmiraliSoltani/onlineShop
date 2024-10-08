// Import the Axios library
import axios from "axios";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "https://backend-online-shop-flame.vercel.app", // Base URL of your backend
});

// Define the APIClient class
export default class APIProduct {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  // Method to get all items
  getAll() {
    console.log("hiiiii123456", this.endpoint);
    axiosInstance
      .get(this.endpoint)
      .then((res) => console.log("dsdsdsdsd", res));
    return axiosInstance.get(this.endpoint).then((res) => res.data);
  }

  // Method to fetch a specific product by ID
  async getSpecificProduct(productId) {
    const getEndpoint = `${this.endpoint}/${productId}`;
    console.log("Fetching product:", getEndpoint);
    try {
      const response = await axiosInstance.get(getEndpoint, {
        headers: {
          "Content-Type": "application/json", // Ensure correct headers
        }
      });
      const productData = response.data;
      console.log("Fetched product:", productData);
      return productData;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }

  // Method to update (patch) a product by ID
  async patchProduct(productId, newData) {
    const patchEndpoint = `${this.endpoint}/${productId}`;
    console.log("Updating product:", patchEndpoint);
    try {
      const response = await axiosInstance.patch(
        patchEndpoint,
        newData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure you are sending JSON
          }
        }
      );
      const updatedProduct = response.data;
      console.log("Updated product:", updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
}



// // Import the Axios library
// import axios from "axios";

// // Create an Axios instance with a base URL
// const axiosInstance = axios.create({
//   baseURL: "https://backend-online-shop-flame.vercel.app",

// });

// // Define the APIClient class
// export default class APIProduct {
//   constructor(endpoint) {
//     this.endpoint = endpoint;
//   }

//   // Method to get all items
//   getAll() {
//     console.log("hiiiii123456", this.endpoint);
//     axiosInstance
//       .get(this.endpoint)
//       .then((res) => console.log("dsdsdsdsd", res));
//     return axiosInstance.get(this.endpoint).then((res) => res.data);
//   }

//   async patchProduct(productId, newData) {
//     // console.log("hiiiii12345678900000000", this.endpoint);
    
    
//     const patchEndpoint = `${this.endpoint}/${productId}`;
//     console.log("hiiiii12345678900000000", patchEndpoint);
//     try {
//       console.log(" hhhhhhhhhhhhhhhhhhhhhhh:",this.endpoint, productId, newData);
//       const response = await axiosInstance.patch(
//         patchEndpoint,
//         newData,
//         {
//           headers: {
//             "Content-Type": "application/json", // Ensure you are sending JSON
//           }
//         }
//       );
//       const updatedProduct = response.data;
//       console.log("Updated product:", updatedProduct);
//       return updatedProduct;
//     } catch (error) {
//       console.error("Error updating product:", error);
//       throw error;
//     }
//   }

  
// }

// Export the APIClient class
