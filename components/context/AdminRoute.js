import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Spinner from "../common/Spinner";
import useStore from "./useStore";

const AdminRoute = ({ children }) => {
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    if (!store?.user && !store?.userLoading) {
      router.push("/");
    } else if (store?.user?.user_role === "user" && !store?.userLoading) {
      router.push("/");
    }
  }, [router, store]);

  return <>{store?.user?.user_role === "admin" ? children : <Spinner />}</>;
};

export default AdminRoute;
