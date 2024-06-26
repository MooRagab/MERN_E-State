import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrab">
            <span className="text-slate-500 ">E-State</span>
            <span className="text-slate-700">Hunt</span>
          </h1>
        </Link>
        <ul className="flex gap-10">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              SignIn
            </li>
          </Link>
        </ul>
        <form
          className="flex items-center bg-white border border-gray-200 rounded-full py-2 px-4
         shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 "
        >
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none w-24 sm:w-64"
          />
        </form>
      </div>
    </header>
  );
}
