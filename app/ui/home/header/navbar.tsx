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
      <header className="bg-white shadow p-4 md:flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl">
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
          {/* Search Bar */}
          <div className="ml-4 flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by tags (e.g., red, aquaflask)"
                className="border border-gray-300 rounded-lg p-2 w-full sm:w-80"
              />
              <button className="absolute right-0 top-0 h-full px-3 rounded-r-lg">
                <MagnifyingGlassCircleIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Icons: Notifications, Avatar */}
        <div className="flex space-x-7 mt-4 sm:mt-0 relative">
          <button className="relative">
            <BellAlertIcon className="h-6 w-6 transition duration-0 hover:duration-150 hover:scale-110" />
          </button>
          < ProfileInterface />
          
        </div>
      </header>
    </div>
  );
}
