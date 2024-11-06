"use client"

import api from "@/services/api";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export type Employee = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string | null;
  birthDate: Date;
  passwordChanged: boolean;
  isManager: boolean;
};

type AuthContextData = {
  isLogged: boolean;
  user: Employee | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      if (!Cookies.get("logged")) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get<Employee>("/employees/@me");

        setUser(data);
      } catch (err) {
        console.log("Invalid accessToken")
        console.log(err)
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function refreshUser() {
    setLoading(true);

    try {
      const { data } = await api.get<Employee>("/employees/@me");

      setUser(data);
    } catch (err) {
      console.log("Invalid accessToken")
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  async function login(username: string, password: string) {
    try {
      const { data } = await api.post("/login", {
        username,
        password
      });

      Cookies.set("logged", "1");

      setUser(data);

      if (!data.passwordChanged) {
        router.push("/change-password");
      } else {
        router.push("/greenhouses");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Invalid credentials",
        text: "Incorrect username or password"
      });
    }
  }

  async function logout() {
    Cookies.remove("logged");
    await api.post("/logout");
    setUser(null);
    router.replace("/");
  }

  if (loading) return <div />;

  return (
    <AuthContext.Provider value={{ isLogged: !!user, user, login, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
