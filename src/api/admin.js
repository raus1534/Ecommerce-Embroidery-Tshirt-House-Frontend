import client from "./client";
export const getFeatureInfoDetail = async () => {
  const auth_token = localStorage.getItem("auth-token");

  try {
    const { data } = await client.get("/admin/feature-info", {
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

export const getUserDetails = async (isNewUsers) => {
  const auth_token = localStorage.getItem("auth-token");

  try {
    const { data } = await client.get("/admin/user-details?new=" + isNewUsers, {
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
export const getOrderDetails = async (isNewOrders) => {
  const auth_token = localStorage.getItem("auth-token");

  try {
    const { data } = await client.get(
      "/admin/order-details?new=" + isNewOrders,
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
