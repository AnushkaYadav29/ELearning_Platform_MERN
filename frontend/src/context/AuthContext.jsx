import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("lmsToken")
  );
  const [loading, setLoading] = useState(true);

  const saveAuthData = (authData) => {
    localStorage.setItem("lmsToken", authData.token);
    localStorage.setItem(
      "lmsUser",
      JSON.stringify(authData.user)
    );

    setToken(authData.token);
    setUser(authData.user);
  };

  const login = async (credentials) => {
    const response = await loginUser(credentials);

    saveAuthData(response);

    return response;
  };

  const register = async (userData) => {
    const response = await registerUser(userData);

    saveAuthData(response);

    return response;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      localStorage.removeItem("lmsToken");
      localStorage.removeItem("lmsUser");

      setToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem("lmsToken");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await getProfile();

        setUser(response.user);
        setToken(storedToken);

        localStorage.setItem(
          "lmsUser",
          JSON.stringify(response.user)
        );
      } catch (error) {
        localStorage.removeItem("lmsToken");
        localStorage.removeItem("lmsUser");

        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};