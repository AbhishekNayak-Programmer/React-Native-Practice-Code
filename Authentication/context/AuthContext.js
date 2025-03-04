import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState();

  const authenticate = (tokenData) => {
    setToken(tokenData);
    AsyncStorage.setItem("token", tokenData);
  };
  const logout = () => {
    setToken(null);
    AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isAuthenticated: !!token,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
