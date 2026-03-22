import { createContext, useContext, useState, ReactNode } from "react";

type Role = "user" | "admin" | null;

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  username: string;
  login: (username: string, password: string, role: Role) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Mock credentials
const MOCK_USERS = {
  admin: { password: "admin123", name: "Admin Officer" },
  user: { password: "user123", name: "Local Citizen" },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const [username, setUsername] = useState("");

  const login = (user: string, password: string, selectedRole: Role): boolean => {
    // Mock auth: accept any non-empty credentials
    if (user && password) {
      setRole(selectedRole);
      setUsername(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setRole(null);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!role, role, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
