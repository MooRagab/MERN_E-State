import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../toolkit/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });


      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };

  return (
    <div className="mt-4 text-center animate-fade-in delay-600">
      <button
        onClick={handleGoogleClick}
        type="button"
        className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out"
      >
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path
            fill="#4285F4"
            d="M44.5 20H24v8.6h11.8c-1.2 3.4-4 5.8-7.5 6.4v5.4h8.6c5-4.6 7.9-11.3 7.9-18.4C44.8 20.6 44.7 20.3 44.5 20z"
          />
          <path
            fill="#34A853"
            d="M24 44c5.4 0 9.8-1.8 13-4.9l-6.2-5.1c-1.8 1.2-4 1.8-6.7 1.8-5.1 0-9.5-3.4-11-8H5.6v5.1C8.8 39.6 15.8 44 24 44z"
          />
          <path
            fill="#FBBC05"
            d="M13 28.8c-.4-1.2-.6-2.5-.6-3.8s.2-2.6.6-3.8V16H5.6C3.7 19 2.8 22.4 2.8 24s.9 5 2.8 8L13 28.8z"
          />
          <path
            fill="#EA4335"
            d="M24 14.8c2.2 0 4.1.8 5.6 2.1L35 10.8c-3.2-3-7.6-5.8-11-5.8C15.8 5 8.8 9.4 5.6 16l7.4 5.7c1.4-3.6 5.8-7.9 11-7.9z"
          />
          <path fill="none" d="M0 0h48v48H0z" />
        </svg>
        Continue with Google
      </button>
    </div>
  );
}
