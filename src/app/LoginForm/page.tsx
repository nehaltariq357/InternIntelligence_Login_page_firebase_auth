"use client";
import React, { useState } from "react";
import { auth } from "../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import ClickSpark from "../animations/click-sparks";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl text-center w-96">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            required
          />
          {error && <p className="text-red-400 mb-3">{error}</p>}
          <button className="bg-purple-600 hover:bg-purple-700 transition-all py-3 rounded-lg text-white font-semibold shadow-lg active:scale-95">
            Login
          </button>
        </form>
        <ClickSpark />
      </div>
    </div>
  );
};

export default LoginForm;
