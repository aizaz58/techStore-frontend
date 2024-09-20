import React from "react";
import { useUserStore } from "../store/useUserStore";

const ProfilePage = () => {
  const { user, logout } = useUserStore();
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-6">
      <div className="bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-2xl lg:text-3xl font-bold text-emerald-400 mb-8 text-center">
          User Profile
        </h2>

        <div className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              First Name
            </label>
            <input
              type="text"
              value={user.firstName}
              disabled
              className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-md border-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={user.lastName}
              disabled
              className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-md border-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-md border-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Role
            </label>
            <input
              type="text"
              value={user.role}
              disabled
              className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-md border-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

       
        </div>
      </div>
    </div>
  );
};



export default ProfilePage;
