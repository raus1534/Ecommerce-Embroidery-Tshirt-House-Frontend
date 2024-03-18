import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authUser, loginUser } from "../api/auth";
import { getCartProduct } from "../api/cart";
import { useNotification } from "../hooks";

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  const isAuth = async () => {
    setAuthInfo({ ...authInfo, isPending: true });
    const token = localStorage.getItem("auth-token");
    if (!token) return setAuthInfo({ ...authInfo, isPending: false });
    const { error, user, tokenExpire } = await authUser();

    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }
    if (tokenExpire) {
      updateNotification("error", "Session Expired. Please Log In Again.");
      return handleLogout();
    }
    const { existingCart, total } = await getCartProduct(user?._id);
    if (existingCart) {
      setCart([...existingCart]);
      setCartTotal(total);
    }
    navigate("/", { replace: true });
    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });
  };

  const handleLogin = async (username, password) => {
    setAuthInfo({ ...authInfo, isPending: true });

    const { error, user } = await loginUser({ username, password });
    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }
    navigate("/");
    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });

    localStorage.setItem("auth-token", user.accessToken);
    isAuth();
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
    setCart([]);
    setCartTotal(0);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    isAuth();
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authInfo,
        isAuth,
        handleLogin,
        handleLogout,
        cart,
        setCart,
        cartTotal,
        setCartTotal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
