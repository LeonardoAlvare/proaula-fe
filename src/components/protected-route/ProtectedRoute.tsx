import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth/auth.store";

interface Props {
  children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const userLogged = useAuthStore((state) => state.userLogged);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged && !pathname.includes("auth")) {
      navigate("/auth");
    }

    if (userLogged && pathname.includes("auth")) {
      navigate("/");
    }

    return () => {};
  }, [userLogged, pathname, navigate]);

  return children;
}

export default ProtectedRoute;
