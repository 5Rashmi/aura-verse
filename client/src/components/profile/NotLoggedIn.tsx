import React from "react";
import Button from "../ui/profile/Button";
import { useRouter } from "next/navigation";

const NotLoggedIn = () => {
  const navigate = useRouter();

  return (
    <div className="blue-container max-w-md mx-auto">
      <p className="text-lg text-zinc-600 dark:text-zinc-300 text-center mb-4">
        Please log in to view your profile.
      </p>
      <div className="flex justify-center gap-4">
        <Button
          name="Sign In"
          onClick={() => navigate.push("/sign-in")}
          border="border-blue-500"
          text="text-blue-300"
          hover="hover:bg-blue-500/10"
          hoverText="hover:text-white"
        />
        <Button
          name="Sign Up"
          onClick={() => navigate.push("/sign-up")}
          border="border-green-500"
          text="text-green-300"
          hover="hover:bg-green-500/10"
          hoverText="hover:text-white"
        />
      </div>
    </div>
  );
};

export default NotLoggedIn;
