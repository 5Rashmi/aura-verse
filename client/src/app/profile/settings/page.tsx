"use client";
import NotLoggedIn from "@/components/profile/NotLoggedIn";
import SideBar from "@/components/SideBar";
import { getCookie } from "@/utils/cookies";
import React, { useEffect, useState } from "react";
import { sideBarItems } from "../sidebar.data";

const ProfileSettings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [view, setView] = useState<React.ReactNode>(sideBarItems[0].value);

  useEffect(() => {
    const token = getCookie({ name: "token" });
    if (!!token) setIsLoggedIn(true);
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          <SideBar
            sidebarName="Profile Settings"
            datas={sideBarItems}
            view={view}
            setView={setView}
          />
        </>
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
};

export default ProfileSettings;
