"use client";

import { useContext } from "react";
import AppContexts from "@/app/lib/context";

export default function LogoutButton() {
  const { setUser } = useContext(AppContexts);

  const logOut = () => {
    setUser({
        username: "",
        email: "",
    });
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
  };

  return <button onClick={logOut}>Logout</button>;
}