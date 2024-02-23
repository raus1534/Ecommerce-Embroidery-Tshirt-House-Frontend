import client from "./client";

export const loginUser = async (loginData) => {
  try {
    const { data } = await client.post("/auth/login", loginData, {
      headers: { accept: "application/json" },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
export const registerUser = async (registerData) => {
  try {
    const { data } = await client.post("/auth/register", registerData, {
      headers: { accept: "application/json" },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
export const authUser = async () => {
  const auth_token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get("/auth/is-auth", {
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
