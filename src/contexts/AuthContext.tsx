import { createContext, useContext, useState, ReactNode } from "react";

type Role = "user" | "admin" | null;

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  username: string;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const MOCK_USERS = [
  { email: "admin@cleancity.com", password: "admin123", role: "admin" as Role, name: "Admin User" },
  { email: "user@cleancity.com", password: "user123", role: "user" as Role, name: "Citizen User" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>(null);
  const [username, setUsername] = useState("");
  const [loading] = useState(false);

  const login = async (email: string, password: string) => {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      setIsAuthenticated(true);
      setRole(found.role);
      setUsername(found.name);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const signup = async (_email: string, _password: string, fullName: string) => {
    setIsAuthenticated(true);
    setRole("user");
    setUsername(fullName);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, username, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
