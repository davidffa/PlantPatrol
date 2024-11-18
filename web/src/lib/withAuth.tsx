import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function withAuth<P extends object>(Component: React.FC<P>) {
  const WithAuthComponent: React.FC<P> = (props) => {
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
