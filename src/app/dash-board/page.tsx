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
    <div className="min-h-screen flex items-center justify-center bg-white text-black  ">
      <div className="bg-white bg-opacity-10  p-10 rounded-3xl shadow-xl text-center max-w-lg w-full">
        {user ? (
          <div>
            <h1 className="text-3xl font-extrabold text-black">
              Welcome Back
            </h1>
            <p className="text-lg font-medium mt-2 text-black">
              {user.email}
            </p>

            <button
              onClick={() => signOut(auth)}
              className="mt-6 px-6 py-3 bg-purple-500 text-white font-bold rounded-full shadow-md transition-all hover:bg-purple-600 hover:shadow-lg active:scale-95"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-lg text-gray-300">Please log in</p>
        )}

        <div className="mt-6">
          <BlurText text="Secure Dashboard" animateBy="letters" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
