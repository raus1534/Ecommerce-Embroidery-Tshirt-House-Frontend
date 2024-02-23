import client from "./client";

export const addToCart = async (userId, productDetail, price) => {
  const auth_token = localStorage.getItem("auth-token");

  try {
    const { data } = await client.post(
      "/cart/add-to-cart",
      { userId, productDetail, price },
      {
        headers: {
          authorization: auth_token,
          accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
export const getCartProduct = async (userId) => {
  console.log(userId);
  const auth_token = localStorage.getItem("auth-token");
  console.log(auth_token);
  try {
    const { data } = await client.post(
      "/cart/get-cart-items",
      { userId },
      {
        headers: {
          authorization: auth_token,
        },
      }
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
