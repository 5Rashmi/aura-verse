"use client";
import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/utils/ProfileActions";
import ProfileImage from "../ui/profile/Image";
import Name from "../ui/profile/Name";
import Button from "../ui/profile/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Dice5, Upload } from "lucide-react";
import { deleteCookie } from "@/utils/cookies";

const ProfileSummary = () => {
  const [profile, setProfile] = useState({
    _id: "",
    name: "",
    email: "",
    description: "",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const navigate = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const update = await updateProfile({
        id: profile._id,
        updatedData: form,
      });
      if (update) {
        setProfile(update.user);
        setIsEditing(false);
        toast.success("Profile updated succesfully");
      }
    } catch (error) {
      console.error("Error updating the changes", error);
      toast.error("Error updating profile");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(7);
    const url = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
    setForm((prev) => ({ ...prev, avatar: url }));
  };

  const handleLogout = async () => {
    try {
      await deleteCookie({ name: "token" });
      navigate.push("/");
    } catch (error) {
      console.log("Error logging out", error);
      toast.error("Error logging out");
    }
  };

  return (
    <div className="blue-container">
      <div className="flex flex-col items-center space-y-4">
        {isEditing ? (
          <div className="flex flex-col items-center space-y-2">
            <ProfileImage src={form.avatar} alt="User avatar" />
            <div className="flex gap-4">
              <label
                htmlFor="avatarUpload"
                className="text-purple-300 hover:text-white cursor-pointer"
                title="Upload avatar"
              >
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  id="avatarUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
              <button
                type="button"
                onClick={handleRandomAvatar}
                className="text-purple-300 hover:text-white cursor-pointer mt-0.5"
                title="Random avatar"
              >
                <Dice5 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <ProfileImage src={profile.avatar} alt="User avatar" />
        )}
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="text-center text-purple-300 bg-transparent border-b border-purple-300 focus:outline-none"
          />
        ) : (
          <Name name={profile.name} />
        )}

        <p className="text-sm text-purple-300">
          {profile.email || "No email found"}
        </p>

        {isEditing ? (
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-purple-300 text-center text-zinc-300 focus:outline-none"
          />
        ) : (
          <p className="text-center text-zinc-300">
            {profile.description || "No description provided."}
          </p>
        )}

        <div className="flex gap-4 mt-6">
          {isEditing ? (
            <>
              <Button
                name="Save"
                onClick={handleSave}
                border="border-green-500"
                text="text-green-300"
              />
              <Button
                name="Cancel"
                onClick={() => setIsEditing(false)}
                border="border-gray-500"
                text="text-gray-300"
              />
            </>
          ) : (
            <>
              <Button
                name="Edit"
                onClick={handleEdit}
                border="border-purple-500"
                text="text-purple-300"
                hover="hover:bg-purple-500/10"
                hoverText="hover:text-white"
              />
              <Button
                name="Logout"
                onClick={handleLogout}
                border="border-red-500"
                text="text-red-300"
                hover="hover:bg-red-500/10"
                hoverText="hover:text-white"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
