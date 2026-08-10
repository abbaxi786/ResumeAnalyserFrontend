"use client";

import React from "react";
import Link from "next/link";
import appContexts from "@/app/lib/context";
import LogoutButton from "./logout";

function Nav() {
  const { user, setUser } = React.useContext(appContexts);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser({
          username: parsedUser.username || "",
          email: parsedUser.email || "",
        });
      } catch (error) {
        console.error("Invalid user data in localStorage");
        localStorage.removeItem("user");
      }
    }
  }, [setUser]);

  const isLoggedIn = Boolean(user.username || user.email);

  return (
    <nav className="w-full bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-wide hover:text-blue-200 transition-colors"
          >
            Resume Analyzer
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">

            <Link
              href="/"
              className="hover:text-blue-200 transition-colors"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="hover:text-blue-200 transition-colors"
            >
              About
            </Link>

            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/pages/log-in"
                  className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-blue-900 transition-all"
                >
                  Login
                </Link>

                <Link
                  href="/pages/sign-in"
                  className="px-4 py-2 rounded-lg bg-white text-blue-900 font-semibold hover:bg-blue-100 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;