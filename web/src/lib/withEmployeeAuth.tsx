"use client"

import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function withEmployeeAuth<P extends object>(Component: React.FC<P>) {
  const WithAuthComponent: React.FC<P> = (props) => {
    const { isLogged, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLogged || user?.manager) {
        router.replace("/");
      }
    }, [isLogged, router, user]);

    if (!isLogged || user?.manager) return null;

    return <Component {...props} />
  }

  return WithAuthComponent;
}