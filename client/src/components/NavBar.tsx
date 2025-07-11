import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProfileImage from "./ui/profile/Image";
import { getProfile } from "@/utils/ProfileActions";
import Link from "next/link";
import { getCookie } from "@/utils/cookies";

const NavBar = () => {
  const [profile, setProfile] = useState({ avatar: "" });
  const token = getCookie({ name: "token" });
  const defaultAvatar = "https://ui-avatars.com/api/?name=Guest";

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <nav className="flex items-center justify-between px-4 py-2">
      <Link href="/">
        <Image
          src="/AuraVerse.ico"
          alt="logo"
          width={50}
          height={50}
          priority
        />
      </Link>
      {token ? (
        <Link href="/profile/settings">
          <ProfileImage
            src={profile.avatar}
            alt="User avatar"
            className="w-12 h-12"
          />
        </Link>
      ) : (
        <Link href="/sign-up">
          <ProfileImage
            src={defaultAvatar}
            alt="Not logged"
            className="w-12 h-12"
          />
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
