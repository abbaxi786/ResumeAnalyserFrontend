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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="min-h-16 py-3 flex flex-wrap items-center justify-between gap-3">

          {/* Logo */}
          <Link
            href="/"
            className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide hover:text-blue-200 transition-colors whitespace-nowrap"
          >
            Resume Analyzer
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">

            <Link
              href="/"
              className="text-sm sm:text-base hover:text-blue-200 transition-colors"
            >
              Home
            </Link>

            <Link
              href="/pages/about"
              className="text-sm sm:text-base hover:text-blue-200 transition-colors"
            >
              About
            </Link>

            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/pages/log-in"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border border-white hover:bg-white hover:text-blue-900 transition-all"
                >
                  Login
                </Link>

                <Link
                  href="/pages/sign-in"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg bg-white text-blue-900 font-semibold hover:bg-blue-100 transition-all"
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