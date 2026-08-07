"use client";

import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Form = {
  username: string;
  email: string;
  password: string;
};

function SignIn() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const router = useRouter();

  const [form, setForm] = useState<Form>({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword,setShowPassword]= useState(false)

  const handleChange =
    (field: keyof Form) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!backendUrl) {
      setError("Backend URL is not configured.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${backendUrl}/api/register/`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(
        response.data.message || "Registration successful!"
      );

      setForm({
        username: "",
        email: "",
        password: "",
      });

      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        router.push("/pages/log-in");
      }, 1500);

    } catch (err: any) {
      console.error(err);

      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <main className="w-full max-w-md rounded-xl bg-blue-900 p-6 shadow-lg">

        <h1 className="mb-6 text-3xl font-bold text-white">
          Sign Up
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <label className="block text-sm text-gray-200">
            <span className="mb-1 block">
              Username
            </span>

            <input
              className="w-full text-white rounded border border-gray-300 px-3 py-2 "
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange("username")}
              required
            />
          </label>

          <label className="block text-sm text-gray-200">
            <span className="mb-1 block">
              Email
            </span>

            <input
              className="w-full text-white rounded border border-gray-300 px-3 py-2"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
          </label>

          <label className="block text-sm text-gray-200">
            <span className="mb-1 block">
              Password
            </span>

            <div className="relative">
              <input
                className="w-full rounded border border-gray-300 px-3 py-2 text-white font-medium"
                type={showPassword ? "text": "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange("password")}
                required
              />
              <button 
                type="button"
                className="absolute right-3 top-2 text-white text-sm hover:text-gray-300" 
                onClick={()=> setShowPassword(!showPassword)}
              >
                {showPassword ? "hide" : "show"}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-white px-4 py-2 font-semibold text-blue-900 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </button>

          <hr className="text-white" />
          <div>
            <p className="text-white">already had account? <Link className="underline" href="/pages/log-in">Log in</Link></p>
          </div>

        </form>

        {message && (
          <p className="mt-4 text-sm text-green-200">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-200">
            {error}
          </p>
        )}

      </main>
    </div>
  );
}

export default SignIn;