"use client";

import { useContext } from "react";
import AppContexts from "@/app/lib/context";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { setUser } = useContext(AppContexts);
  const router = useRouter();

  const logOut = () => {
    setUser({
        username: "",
        email: "",
    });
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    router.push("/");
  };

  return <button onClick={logOut}>Logout</button>;
}