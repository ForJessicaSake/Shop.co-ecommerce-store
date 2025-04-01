import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router";
import { admin_token } from "../api-client";
type Options = {
  authenticated?: boolean;
};

export function adminAuth<T extends {}>(
  Component: ComponentType<T>,
  { authenticated }: Options = { authenticated: true }
) {
  return (props: T) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!admin_token && authenticated) {
        navigate("/login");
      }
    }, [navigate, authenticated, admin_token]);

    return <Component {...props} />;
  };
}
