import { ComponentType, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { getCurrentToken } from "../api-client";
type Options = {
  authenticated?: boolean;
};

export function adminAuth<T extends {}>(
  Component: ComponentType<T>,
  { authenticated }: Options = { authenticated: true }
) {
  return (props: T) => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = getCurrentToken();

    useEffect(() => {
      if (!token && authenticated) {
        navigate("/login");
      }
      if (token && location.pathname === "/login") {
        navigate("/");
      }
    }, [navigate, authenticated, token]);

    return <Component {...props} />;
  };
}
