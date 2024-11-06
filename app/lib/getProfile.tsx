'use client'

import Image from 'next/image';
import { useState } from 'react';

export default function DisplayProfile() {
  // Mock user data, replace with actual user data
  const [avatarUrl, setAvatarUrl] = useState("/logo.svg"); // Default avatar

  return (
    <div className="relative">
      {/* Avatar with Dropdown */}
      <div className="flex items-center cursor-pointer">
        <div className="w-6 border border-red-500 rounded-3xl overflow-hidden">
          <Image
            src={avatarUrl} // User's avatar URL
            alt="User Avatar"
            width={24}
            height={24}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
