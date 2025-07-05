import Image from "next/image";
import React from "react";

const NavBar = () => {
  return (
    <nav className="flex">
      <Image src="/AuraVerse.ico" alt="logo" width={50} height={50} />
    </nav>
  );
};

export default NavBar;
