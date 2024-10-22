import Link from 'next/link';
import Image from 'next/image';
import ProfileInterface from './profileInterface';
import {
  MagnifyingGlassCircleIcon,
  BellAlertIcon,
} from '@heroicons/react/24/outline';

export default function Header() {

  return (
    <div className="relative">
      <header className="bg-white p-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="w-10 h-12 rounded-full flex items-center justify-center text-white text-xl">
            <Link href="/home">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={100}
                height={100}
                className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </Link>
          </div>

          {/* Right: Notifications and Avatar */}
          <div className="flex space-x-7 md:hidden"> {/* hidden on large screens */}
            <button className="relative">
              <BellAlertIcon className="h-6 w-6 transition duration-0 hover:duration-150 hover:scale-110" />
            </button>
            <ProfileInterface />
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="mt-3 md:mt-0 sm:mx-5 w-full md:w-[680px] flex justify-center order-3 md:order-2">
          <div className="relative w-full ">
            <input
              type="text"
              placeholder="Search by tags (e.g., red, aquaflask)"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
            <button className="absolute right-0 top-0 h-full px-3 rounded-r-lg">
              <MagnifyingGlassCircleIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Right: Notifications and Avatar (shown on large screens) */}
        <div className="hidden md:flex space-x-7 order-2 md:order-3"> {/* hidden on small screens */}
          <button className="relative">
            <BellAlertIcon className="h-6 w-6 transition duration-0 hover:duration-150 hover:scale-110" />
          </button>
          <ProfileInterface />
        </div>
      </header>
    </div>
  );
}
