import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Use named import for jwtDecode
import ReadTokenInformation from "./ReadTokenInformation";
import SyncbackAndFront from "./SyncbackAndFront";


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

function setAuthenticateToken(token) {
  localStorage.setItem("access_token", token);
}

export function getAuthenticateToken() {
  try {
    return localStorage.getItem("access_token");
  } catch (err) {
    return null;
  }
}

export function readAuthenticateToken() {
  try {
    const token = getAuthenticateToken();
    const decodedToken = token ? jwtDecode(token) : null;
    
    // Deduplicate the shopping cart items in the token
    if (decodedToken && decodedToken.shoppingCart) {
      decodedToken.shoppingCart = deduplicateItems(decodedToken.shoppingCart);
    }
    
    return decodedToken;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  const token = readAuthenticateToken();
  return token ? true : false;
}

export function removeAuthenticateToken() {
  localStorage.removeItem("access_token");
}

export async function authenticateUser(data) {
  console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
  try {
    const response = await axios.post("https://backend-register-online-shop.vercel.app/api/login", {
      username: data.username,
      password: data.password,
    });

    if (response.status === 200) {
      console.log("ttttttttttttt", response.data);

      setAuthenticateToken(response.data.token);
      const decodedToken = jwtDecode(response.data.token);

      const userId = decodedToken._id;
      const userName = decodedToken.username;
      console.log("aaaaaaa", userId, userName);
      //  SyncbackAndFront(decodedToken);
      return [true, response.data.user];
    } else {
      console.log("sssssss", response.data);
      return [false, response.data.message];
    }
  } catch (error) {
    console.log("ggggggggggggg", error.response?.data?.message);
     return [false, error.response?.data?.message];
  }
}

export async function registerUser(data) {
  try {
    console.log("first");
    //const response = await axios.post("http://localhost:8080/register", {
      const response = await axios.post(
        "https://backend-register-online-shop.vercel.app/api/register", 
        {
          username: data.username,
          password: data.password,
          name: data.name,
          lastName: data.lastName,
          gender: data.gender,
        },
        {
          withCredentials: true, // Ensure credentials are included (if needed)
        }
      );
    if (response.status === 200) {
      setAuthenticateToken(response.data.token);
      //ReadTokenInformation();
      // SyncbackAndFront();
      console.log("yesssssssssssss");

      console.log('yesssssssssssss',response.data.message);
      

      console.log("yesssssssssssss",response.data.token);
      return [true, response.data.user];
    } else {
      console.log("noooooooooooooooooooooooooooooooooooooooooo");
      console.log("noooooo",response.data);
      return [false, response.data.message];
    }
  } catch (error) {
    console.log("noooooooooooooooooooooooooooooooooooooooooo22222222");
    console.log(error,"noooooooooooooooooooooooooooooooooooooooooo22222222");

    console.log(error);

    console.log(error.response?.data?.message || error);
    return [false, error.response?.data?.message];
  }
}



// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import ReadTokenInformation from "./ReadTokenInformation";

// function setAuthenticateToken(token) {
//   localStorage.setItem("access_token", token);
// }

// export function getAuthenticateToken() {
//   try {
//     return localStorage.getItem("access_token");
//   } catch (err) {
//     return null;
//   }
// }

// export function readAuthenticateToken() {
//   try {
//     const token = getAuthenticateToken();
//     return token ? jwtDecode(token) : null;
//   } catch (err) {
//     return null;
//   }
// }

// export function isAuthenticated() {
//   const token = readAuthenticateToken();
//   return token ? true : false;
// }

// export function removeAuthenticateToken() {
//   localStorage.removeItem("access_token");
// }

// export async function authenticateUser(data) {
//   console.log("hiiiiii");
//   try {
//     const response = await axios.post("http://localhost:8080/login", {
//       username: data.username,
//       password: data.password,
//     });

//     if (response.status === 200) {
//       console.log("ttttttttttttt", response.data);

//       setAuthenticateToken(response.data.token);
//       const decodedToken = jwtDecode(response.data.token);

//       const userId = decodedToken._id;
//       const userName = decodedToken.username;
//       console.log("aaaaaaa", userId, userName);
//       return [true, response.data.user];
//     } else {
//       console.log("sssssss", response.data);
//       return [false, response.data.message];
//     }
//   } catch (error) {
//     console.log("ggggggggggggg", error.response.data.message);
//     return [false, error.response.data.message];
//     //throw new Error(error.response.data.message || error.message);
//   }
// }

// export async function registerUser(data) {
//   try {
//     console.log("first");
//     const response = await axios.post("http://localhost:8080/register", {
//       username: data.username,
//       password: data.password,
//       name: data.name,
//       lastName: data.lastName,
//       gender: data.gender,
//     });

//     if (response.status === 200) {
//       setAuthenticateToken(response.data.token);
//       //ReadTokenInformation();
//       console.log(response.data.token);
//       return [true, response.data.user];
//     } else {
//       console.log(response.data.message);
//       return [false, response.data.message];
//     }
//   } catch (error) {
//     console.log(error);

//     console.log(error.response.data.message || error.message);
//     return [false, error.response.data.message];
//   }
// }

// export async function authenticateUser(user, password) {
// console.log("hiiiiii")
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
//     method: "POST",
//     body: JSON.stringify({ userName: user, password: password }),
//     headers: {
//       "content-type": "application/json"
//     }
//   });

//   const data = await res.json();

//   if (res.status === 200) {
//     setToken(data.token);
//     return true;
//   } else {
//     throw new Error(data.message);
//   }
// }

// export async function registerUser(user, password, password2){
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
//       method: "POST",
//       body: JSON.stringify({ userName: user, password: password,password2: password2 }),
//       headers: {
//         "content-type": "application/json"
//       }
//     });

//     const data = await res.json();

//     if (res.status === 200) {
//       return true;
//     } else {
//       throw new Error(data.message);
//     }
//   }
