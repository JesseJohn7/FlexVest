"use client";

import { useState, useEffect, ChangeEvent, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Edit3, Save, Upload, LogOut } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SettingsSection() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const [name, setName] = useState(user?.fullName || "");
  const [tempName, setTempName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || "");
  const [avatar, setAvatar] = useState<string | null>(user?.imageUrl || null);
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.fullName || "");
      setTempName(user.fullName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
      setAvatar(user.imageUrl || null);
    }
  }, [user]);

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      try {
        await user.setProfileImage({ file });
        showSuccess("✅ Profile photo updated!");
      } catch (error) {
        console.error("Failed to update avatar:", error);
      }
    }
  };

  const handleSaveProfile = async () => {
    if (user && tempName !== name) {
      try {
        const nameParts = tempName.split(' ');
        await user.update({ 
          firstName: nameParts[0], 
          lastName: nameParts.slice(1).join(' ') 
        });
        setName(tempName);
        showSuccess("✅ Profile updated successfully!");
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    }
    setEditing(false);
  };

  const showSuccess = (msg: SetStateAction<string>) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full space-y-6"
    >
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden cursor-pointer group">
          {avatar ? (
            <img src={avatar} alt="avatar" className="object-cover w-full h-full" />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-bold text-2xl">
              {name?.charAt(0)}
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition">
            <span className="text-xs mb-1">Change Photo</span>
            <Upload size={16} />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">{name}</h2>
          <p className="text-sm text-gray-400">{email}</p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4 sm:p-5 bg-[#151515]/80 rounded-lg hover:bg-[#1a1a1a]/90 transition relative">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-white">Profile Info</h3>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300"
            >
              <Edit3 size={14} /> Edit
            </button>
          ) : (
            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300"
            >
              <Save size={14} /> Save
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Full Name</label>
            {editing ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter your name"
                className="w-full mt-1 p-2 rounded-md bg-transparent border border-white/20 focus:ring-2 focus:ring-green-400 text-sm text-white"
              />
            ) : (
              <p className="text-white font-medium mt-1">{name}</p>
            )}
          </div>

          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <p className="text-gray-300 mt-1">{email}</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center gap-2 bg-red-700/50 hover:bg-red-600/70 text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold w-full sm:w-auto transition"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-green-400 text-sm font-semibold"
        >
          {success}
        </motion.div>
      )}
    </motion.div>
  );
}