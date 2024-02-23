import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authUser, loginUser } from "../api/auth";
import { getCartProduct } from "../api/cart";

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

  const navigate = useNavigate();

  const isAuth = async () => {
    setAuthInfo({ ...authInfo, isPending: true });
    const token = localStorage.getItem("auth-token");
    if (!token) return setAuthInfo({ ...authInfo, isPending: false });
    const { error, user } = await authUser();

    if (error) return setAuthInfo({ ...authInfo, isPending: false, error });
    const { existingCart, total } = await getCartProduct(user._id);
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
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
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
