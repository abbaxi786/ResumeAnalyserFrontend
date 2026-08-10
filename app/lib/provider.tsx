"use client";

import { useState } from "react";
import AppContexts from "./context";

interface User {
  username: string;
  email: string;
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
  });

  return (
    <AppContexts.Provider value={{ user, setUser }}>
      {children}
    </AppContexts.Provider>
  );
}