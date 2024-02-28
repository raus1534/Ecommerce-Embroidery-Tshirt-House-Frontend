import client from "./client";

export const placeOrder = async (userId, shippingAddress, payment_method) => {
  const auth_token = localStorage.getItem("auth-token");

  try {
    const { data } = await client.post(
      "/order/place-order",
      { userId, shippingAddress, payment_method },
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
