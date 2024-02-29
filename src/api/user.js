import client from "./client";
export const deleteUser = async (id) => {
  const auth_token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.delete("/users/" + id, {
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
