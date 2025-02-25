"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BlurText from "../animations/text";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/LoginForm");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-3xl shadow-lg text-center max-w-md">
        {user ? (
          <div>
            <h1 className="text-2xl font-bold">Welcome,</h1>
            <p className="text-lg font-semibold mt-2 text-gray-200">{user.email}</p>
            <button
              onClick={() => signOut(auth)}
              className="mt-5 px-6 py-2 bg-red-500 text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-105 active:scale-95"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-lg">Please login</p>
        )}
        <div className="mt-5">
          <BlurText text="Secure Dashboard" animateBy="letters" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
