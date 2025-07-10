import Button from "@/components/ui/profile/Button";
import Toast from "@/components/ui/Toast";
import { deleteProfile, getProfile } from "@/utils/ProfileActions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DeleteAccount = () => {
  const [profile, setProfile] = useState({ _id: "" });
  const navigate = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, []);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmed) return;

    try {
      const res = await deleteProfile({ id: profile._id });
      if (res) {
        toast.success("Account deleted successfully");
        navigate.push("/");
      } else {
        console.error("Error deleting account");
        toast.error("Error deleting account");
      }
    } catch (error) {
      console.error("Error deleting profile", error);
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="blue-container text-center space-y-6">
      <Toast />
      <h2 className="text-2xl font-semibold text-red-400">Delete Account</h2>
      <p className="text-sm text-zinc-300">
        This action is permanent and cannot be undone. All your data will be
        erased.
      </p>
      <Button
        name="Delete My Account"
        onClick={handleDelete}
        border="border-red-500"
        text="text-red-300"
        hover="hover:bg-red-500/10"
        hoverText="hover:text-white"
      />
    </div>
  );
};

export default DeleteAccount;
