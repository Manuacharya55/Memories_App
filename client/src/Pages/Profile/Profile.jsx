import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import useProfile from "../../Hooks/useProfile";
import toast from "react-hot-toast";
import Modal from "../../Components/UI/Modal";
import ProfileForm from "../../Form/ProfileForm";
import ChangePasswordForm from "../../Form/ChangePasswordForm";
import Loader from "../../Components/UI/Loader";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { token } = useAuthContext();
  const { profile, processing, loading, getProfile, updatePassword, updateProfile } = useProfile();

  const fetchProfile = async () => {
    if (!token) return;
    await getProfile(token);
  }

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const handleUpdateProfile = async (data) => {
    const res = await updateProfile(data, token);
    if (res) {
      setIsEditModalOpen(false);
    }
  };

  const handlePasswordSubmit = async (data) => {
    const response = await updatePassword(data, token);
    if (response) {
      return true;
    }
    return false;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Header Section */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-700 bg-white px-4 py-2 rounded-lg border border-zinc-100 shadow-sm hover:shadow transition-all active:scale-95"
          >
            Edit Details
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* User Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="relative group">
              <img
                src={profile?.image || "https://img.freepik.com/free-photo/lavender-field-sunset-near-valensole_268835-3910.jpg?semt=ais_hybrid&w=740&q=80"}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute inset-0 rounded-full border border-gray-100 pointer-events-none"></div>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {profile?.fullname || "User Name"}
              </h2>
              <p className="text-gray-500 font-medium">
                {profile?.email || "email@example.com"}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                  Member
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Change Password Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-zinc-600">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
                Security
              </h3>
              <p className="text-sm text-gray-500 mt-1 ml-7">Manage your password and security settings</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <ChangePasswordForm
                onSubmit={handlePasswordSubmit}
                processing={processing}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile Details"
      >
        <ProfileForm
          value={profile}
          processing={processing}
          updateProfile={handleUpdateProfile}
        />
      </Modal>
    </div>
  );
};

export default Profile;
