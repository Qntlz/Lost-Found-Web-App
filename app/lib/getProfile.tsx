"use client"

import { useState } from "react";
import Image from "next/image";

type DisplayProfileProps = {
  size?: number;
};

export default function DisplayProfile({ size = 80 }: DisplayProfileProps) { // Default to 100 if not passed
  const [avatarUrl, setAvatarUrl] = useState("/logo.svg");

  // console.log("Width passed to DisplayProfile:", size); // Debug log

  return (
    <div className="relative">
      <div className="flex items-center cursor-pointer">
        <div>
          <Image
            src={avatarUrl}
            alt="User Avatar"
            width={size}
            height={size}
            className="p-2 rounded-full outline outline-2 outline-red-500 outline-offset-1 xl:p-0"
            priority
          />
        </div>
      </div>
    </div>
  );
}
