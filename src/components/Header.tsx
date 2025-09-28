"use client";

import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="md:hidden">
        <HeaderMobile />
      </div>

      <div className="hidden md:block">
        <HeaderDesktop />
      </div>
    </header>
  );
}
