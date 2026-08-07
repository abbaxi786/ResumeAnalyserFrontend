"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

function LogIn() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const router = useRouter();

  const [form, setForm] = React.useState<FormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [show, setShow] = React.useState(false)

  async function handleSubmit(
    e: React.SyntheticEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${backendUrl}/api/login/`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Save JWT Tokens
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      setSuccess("Login successful!");

      console.log(response.data);

      // router.push("/dashboard");

    } catch (err: any) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen  items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-96 bg-blue-900 text-white flex-col gap-4 rounded-lg border p-6 shadow"
      >
        <h1 className="text-center text-2xl font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full text-white rounded border border-gray-300 px-3 py-2 "
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          required
        />

        <div className="relative">
          <input
            className="w-full rounded border border-gray-300 px-3 py-2 text-white font-medium"
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-white text-sm hover:text-gray-300"
            onClick={() => setShow(!show)}
          >
            {show ? "hide" : "show"}
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-800 p-2 rounded"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        <hr className="text-white" />

        <div><p>had not any account? <Link className="underline" href={'/pages/sign-in'}>Sign up</Link></p></div>

        {success && (
          <p className="text-center text-green-600">
            {success}
          </p>
        )}

        {error && (
          <p className="text-center text-red-600">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default LogIn;