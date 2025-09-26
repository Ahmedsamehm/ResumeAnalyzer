import React from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const NavBarResume = () => {
  const { auth } = usePuterStore();
  return (
    <nav className="resume-nav">
      <Link to="/" className="back-button">
        <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
        <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
      </Link>
      <div className="flex items-center gap-2">
        <img src="/Placeholder.png" alt="avatar" className="size-10 border border-gray-400 rounded-full p-1" />
        <span className="text-xl">{auth.user?.username}</span>
      </div>
    </nav>
  );
};

export default NavBarResume;
