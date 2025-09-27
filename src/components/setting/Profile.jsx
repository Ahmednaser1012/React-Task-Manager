import { User } from "lucide-react";
import { useSelector } from "react-redux";
export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <div className="w-full text-center sm:text-left bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-4 sm:p-6 border border-gray-700 mb-8 mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 mb-3">
          <User className="text-indigo-400 mt-.5" size="24" />
          <h2 className="text-xl font-semibold text-gray-300">Profile</h2>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center">
            <span className="text-gray-100 font-medium">
              {user.name.charAt(0)}
            </span>
          </div>

          <div>
            <h3 className=" flex text-lg font-semibold text-gray-100">
              {user ? user.name : "My Account"}
            </h3>
            <p className="text-gray-400">{user ? user.email : "My Account"}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto cursor-pointer">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};
