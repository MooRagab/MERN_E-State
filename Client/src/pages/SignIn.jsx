import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [setError, error] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 p-4">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-500">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6 animate-fade-in-down">
          Sign In
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

          <div className="flex items-center justify-between animate-fade-in delay-400">
            <button
              disabled={loading}
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="mt-4 text-center animate-fade-in delay-500">
          <p className="text-gray-700 text-sm">
            Don’t have an account?{" "}
            <Link to={"/sign-up"} className="text-blue-700 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
