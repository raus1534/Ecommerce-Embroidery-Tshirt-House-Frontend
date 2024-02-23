import client from "./client";

export const placeOrder = async (userId) => {
  const auth_token = localStorage.getItem("auth-token");

  try {
    const { data } = await client.post(
      "/order/place-order",
      { userId },
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
