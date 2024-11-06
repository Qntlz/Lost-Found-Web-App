"use client"

import { useState } from "react";
import SideNav from '../home/Sidenav';
import {
  MagnifyingGlassIcon,
  BellAlertIcon, Bars3Icon
} from '@heroicons/react/24/outline';
import { playfairDisplay } from '../fonts';
import DisplayProfile from "@/app/lib/getProfile";
import ProfileSideNav from '@/app/ui/header/ProfileSidenav';

export default function Header() {

  const [showNav, setShowNav] = useState(false);
  const [showProfileNav, setShowProfileNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="relative">
      <header className="fixed top-0 w-full z-20 bg-white p-4 border-b-2">

        <div className="grid grid-cols-2 md:grid-cols-7 w-full">

          {/* Left: Logo */}
          <div className="flex w-full items-center">
            <div className="flex items-center">
              <div>
                <button onClick={() => setShowNav(!showNav)}>
                  <Bars3Icon className="w-7 mr-2 mt-2 text-gray-500 cursor-pointer" />
                </button>
              </div>
              <div className="justify-self-start">
                <span className={`${playfairDisplay.className} font-semibold text-red-500 text-xl text-nowrap`}>LOST & FOUND</span>
              </div>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="order-last col-span-2 md:col-span-4 md:col-start-3 min-w-full">
            {showSearch && (
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by tags (e.g., red, aquaflask)"
                  className="mt-1 p-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            )}
          </div>

          {/* Right: Notifications and Avatar */}
          <div className="flex justify-self-end md:order-last">
            <div className="ml-2 pt-2">
              <button onClick={() => setShowSearch(!showSearch)}>
                <MagnifyingGlassIcon className="w-6 text-red-500 cursor-pointer" />
              </button>
            </div>
            <div className="ml-2 pt-2">
              <button>
                <BellAlertIcon className="w-6 text-red-500 transition duration-0 hover:duration-150 hover:scale-110" />
              </button>
            </div>
            <div className="hidden xl:flex w-6 ml-2">
              {/* Add Avatar Here */}
              <button onClick={() => setShowProfileNav(!showProfileNav)}>
                  < DisplayProfile/>
              </button>
            </div>
          </div>
        </div>

        <SideNav show={showNav} closeNav={() => setShowNav(!showNav)} />
        <ProfileSideNav show={showProfileNav} closeNav={() => setShowProfileNav(!showProfileNav)} />
      </header>
    </div>
  );
}

