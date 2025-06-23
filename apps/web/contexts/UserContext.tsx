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
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  logOutUser: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Configure axios instance
const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

// User Provider Component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const logOutUser = () => {
    localStorage.removeItem("authToken"); // Clear token from localStorage
    setUser(null); // Clear user state
    window.location.href = "/signin"; // Redirect to sign-in page
  };

  // Extract token from URL (for OAuth redirects)
  const extractTokenFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      localStorage.setItem("authToken", urlToken);

      // Clean up URL by removing token parameter
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("token");
      window.history.replaceState({}, document.title, newUrl.pathname);

      return urlToken;
    }
    return null;
  };

  // Fetch user data using token
  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) return;

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
    }
  };

  // Initialize user state
  useEffect(() => {
    // First, check if there's a token in the URL (OAuth redirect)
    extractTokenFromURL();

    // Then fetch user data if token exists
    fetchUserData();
  }, []);

  const value: UserContextType = {
    user,
    isAuthenticated: !!user,
    logOutUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
