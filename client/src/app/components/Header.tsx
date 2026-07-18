"use client";
import React from 'react';
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="sticky top-0 w-full h-24 bg-transparent flex items-center justify-end px-8 z-50">
      <div className="flex items-center gap-4">
        {/* UserButton automatically provides a dropdown with a "Sign out" option */}
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-12 h-12 border-2 border-gray-200" // made avatar slightly bigger for taller header
            }
          }}
        />
      </div>
    </header>
  );
};

export default Header;
