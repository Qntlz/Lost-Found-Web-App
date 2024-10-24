'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function ProfileInterface() {
  // Mock user data, replace with actual user data
  const [avatarUrl, setAvatarUrl] = useState("/logo.svg"); // Default avatar
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Auto close the dropdown after 5 seconds
  useEffect(() => {
    if (isDropdownOpen) {
      const timer = setTimeout(() => {
        closeDropdown();
      }, 5000); // Auto close after 5000ms (5 seconds)

      return () => clearTimeout(timer);
    }
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar with Dropdown */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={avatarUrl} // User's avatar URL
            alt="User Avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20">
          <Link href="/home/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={closeDropdown}>
            Profile
          </Link>
          <Link href="/profile/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={closeDropdown}>
            Settings
          </Link>
        </div>
      )}
    </div>
  );
}
