"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: "local" | "google" | "github";
  isVerified: boolean;
  lastLogin: string;
  createdAt: string;
  questionsSolved?: string[];
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  logOutUser: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Provider Component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    window.location.href = "/signin";
  };

  const extractTokenFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      localStorage.setItem("authToken", urlToken);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("token");
      window.history.replaceState({}, document.title, newUrl.pathname);
      return urlToken;
    }

    return null;
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);
    } catch (err) {
      console.error("Error fetching user data:", err);
      localStorage.removeItem("authToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    extractTokenFromURL();
    fetchUserData();
  }, []);

  const value: UserContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    logOutUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Hook
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
