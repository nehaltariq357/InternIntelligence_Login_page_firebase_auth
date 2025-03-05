"use client";
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Login successful!");
      setFormData({ email: "", password: "" });
      setError("");
      router.push("/dash-board");
    } catch (err: any) {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-[900px] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side (Full Cover Image) */}
        <div className="w-1/2 relative">
          <Image
            src="/left-pic.png"
            layout="fill"
            objectFit="cover"
            alt="Register Illustration"
          />
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Log In</h1>
          <p className="text-gray-500 mb-6 text-sm">
            Enter your email and password to log in to your dashboard.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />

            {error && <p className="text-red-500 mb-3">{error}</p>}

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all">
              Sign In
            </button>
          </form>

          <div className="flex justify-between text-sm text-gray-600 mt-4">
            <a href="#" className="hover:text-indigo-600">
              Forgot Password?
            </a>
            <Link href="/registerForm" className="hover:text-indigo-600">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
