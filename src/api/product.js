import client from "./client";

export const getProductDetail = async (productId) => {
  try {
    const { data } = await client.get("/products/find/" + productId);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
