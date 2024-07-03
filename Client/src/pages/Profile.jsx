import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="texr-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.pfp}
          alt="profile"
          className="mt-2 self-center rounded-full h-24 w-24 object-cover cursor-pointer"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="E-mail"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <buttom className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 text-center">
          Update
        </buttom>
      </form>
      <div className="flex justify-between">
        <span className="text-red-700 cursor-pointer"> Delete Account</span>
        <span className="text-red-700 cursor-pointer"> Sign Out</span>
      </div>
    </div>
  );
}
