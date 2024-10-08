import React from "react";
import logo from "./logo-scaled.png";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800">
      <img src={logo} className="h-10" alt="Zonda logo" />
    </header>
  );
};
