import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 p-4">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-500">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6 animate-fade-in-down">
          Sign
          In
        </h2>
        <form>
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
            />
          </div>

          <div className="flex items-center justify-between animate-fade-in delay-400">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out"
            >
              Log in
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
    </div>
  );
}
