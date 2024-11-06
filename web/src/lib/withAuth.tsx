import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react"

export default function withAuth(Component: ComponentType) {
  const WithAuthComponent: React.FC = (props) => {
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
