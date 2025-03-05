"use client";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const router = useRouter();
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      });

      alert("User registered successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
      router.push("/LoginForm");
    } catch (err) {
      setError("Error registering user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Left Side with Image */}
        <div className="relative w-1/2 h-auto">
          <Image
            src="/left-pic.png"
            alt="Register Illustration"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side with Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Register</h1>
          <p className="text-gray-500 mb-6">
            Create an account to get started.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold transition">
              Register
            </button>
          </form>
          <p className="text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <Link href="/LoginForm" className="text-purple-600 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
