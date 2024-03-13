import client from "./client";

export const getProducts = async () => {
  try {
    const { data } = await client.get("/products/");
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
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
export const createProduct = async (productDetail) => {
  const auth_token = localStorage.getItem("auth-token");

  try {
    const { data } = await client.post("/products/add", productDetail, {
      headers: {
        authorization: auth_token,
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
export const updateProduct = async (productDetail, productId) => {
  const auth_token = localStorage.getItem("auth-token");

  try {
    const { data } = await client.put(
      "/products/update/" + productId,
      productDetail,
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
export const deleteProduct = async (productId) => {
  const auth_token = localStorage.getItem("auth-token");

  try {
    const { data } = await client.delete("/products/" + productId, {
      headers: {
        authorization: auth_token,
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
