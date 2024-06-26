import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 p-4">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-500">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6 animate-fade-in-down">
          Create an account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 animate-fade-in">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 animate-fade-in delay-100">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 animate-fade-in delay-200">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6 animate-fade-in delay-300">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              id="cpassword"
              type="password"
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between animate-fade-in delay-400">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4 text-center animate-fade-in delay-500">
          <p className="text-gray-700 text-sm">
            Have an account?{" "}
            <Link to={"/sign-in"} className="text-blue-700 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
