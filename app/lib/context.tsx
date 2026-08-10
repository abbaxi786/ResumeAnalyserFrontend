"use client";

import { createContext } from "react";

interface User {
  username: string;
  email: string;
}

interface AppContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const AppContexts = createContext<AppContextType>({
  user: {
    username: "",
    email: "",
  },
  setUser: () => {},
});

export default AppContexts;