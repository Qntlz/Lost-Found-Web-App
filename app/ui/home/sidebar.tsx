'use client';  // Add this line to make Sidebar a client component

import { inter } from '../fonts';
import { useState } from 'react';
import {
    ChatBubbleLeftRightIcon,
    PencilSquareIcon,
    ArchiveBoxArrowDownIcon,
    MegaphoneIcon,
    Bars3Icon,
    NewspaperIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <div className="relative">
            {/* Hamburger Menu Icon for Mobile */}
            <button onClick={toggleDropdown} className="lg:hidden">
                <Bars3Icon className="h-6 w-6 text-gray-500" />
            </button>

            {/* Left Sidebar */}
            <div className={`lg:col-span-2 mt-3 rounded-lg hidden lg:block`}>
                <button className={`ml-4 mt-5 text-red-500 px-4 py-2 rounded-lg ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <PencilSquareIcon className="h-6 w-6 mr-2" />
                    New Post
                </button>
                <button className={`ml-4 text-red-500 px-4 py-2 rounded-lg sm:text-left ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <MegaphoneIcon className="h-6 w-6 mr-2 -rotate-[20deg]" />
                    New Announcement
                </button>
                <button className={`ml-4 text-red-500 px-4 py-2 rounded-lg ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2" />
                    Chats
                </button>
                {/* Add Division */}
                <button className={`ml-4 text-red-500 px-4 py-2 rounded-lg ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <NewspaperIcon className="h-6 w-6 mr-2" />
                    My Post
                </button>
                <button className={`ml-4 text-red-500 px-4 py-2 rounded-lg ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <ArchiveBoxArrowDownIcon className="h-6 w-6 mr-2" />
                    Archives
                </button>
            </div>

            {/* Mobile Dropdown Menu with Smooth Animation */}
            <div
                className={`absolute bg-white shadow-lg rounded-lg mt-2 left-0 w-full lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isDropdownOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <button className={`ml-4 text-red-500 px-4 py-2 rounded-lg ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <PencilSquareIcon className="h-6 w-6 mr-2" />
                    New Post
                </button>
                <button className={`ml-4 text-red-500 px-4 py-2 rounded-lg ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <MegaphoneIcon className="h-6 w-6 mr-2 -rotate-[20deg]" />
                    New Announcement
                </button>
                <button className={`ml-4 text-red-500 px-4 py-2 rounded-lg ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2" />
                    Chats
                </button>
                <button className={`ml-4 text-red-500 px-4 py-2 rounded-lg ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <ArchiveBoxArrowDownIcon className="h-6 w-6 mr-2" />
                    Archives
                </button>
            </div>
        </div>
    );
}
