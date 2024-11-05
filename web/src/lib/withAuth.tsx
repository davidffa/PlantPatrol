import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { ComponentType, ReactNode, useEffect } from "react"

type Props = {
  children: ReactNode;
};

export default function withAuth<T extends Props>(Component: ComponentType<T>) {
  const WithAuthComponent = (props: T) => {
    const { isLogged } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLogged) {
        router.replace("/");
      }
    }, [isLogged, router]);

    if (!isLogged) return null;

    return <Component {...props} />
  }

  return WithAuthComponent;
}
