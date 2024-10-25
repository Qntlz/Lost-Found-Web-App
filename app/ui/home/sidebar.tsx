'use client';  // Add this line to make Sidebar a client component

import { inter } from '../fonts';
import { useState, useEffect, useRef } from 'react';
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
    const dropdownRef = useRef<HTMLDivElement>(null); // Reference for the dropdown

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);  // Close dropdown
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Clean up the event listener
        };
    }, [dropdownRef]);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Hamburger Menu Icon for Mobile */}
            <button onClick={toggleDropdown} className="lg:hidden">
                <Bars3Icon className="h-6 w-6 text-gray-500" />
            </button>

            {/* Desktop Sidebar */}
            <div className={`lg:col-span-2 m-3 rounded-lg hidden lg:block`}>
                <button className={`ml-4 mt-5 text-red-500 py-2 rounded-lg ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <PencilSquareIcon className="h-6 w-6 mr-2" />
                    New Post
                </button>
                {/* Announcement Feature for Adminds Only */}
                {/* <button className={`ml-4  text-red-500 py-2 rounded-lg sm:text-left ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <MegaphoneIcon className="h-6 w-6 mr-2 -rotate-[20deg]" />
                    New Announcement
                </button> */}
                <button className={`ml-4 text-red-500 py-2 rounded-lg ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2" />
                    Chats
                </button>
                {/* Add Division */}
                <button className={`ml-4 text-red-500 py-2 rounded-lg ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <NewspaperIcon className="h-6 w-6 mr-2" />
                    My Post
                </button>
                <button className={`ml-4 text-red-500 py-2 rounded-lg ${inter.className} flex items-center transition duration-0 hover:duration-150 hover:scale-110`}>
                    <ArchiveBoxArrowDownIcon className="h-6 w-6 mr-2" />
                    Archives
                </button>
            </div>

            {/* Mobile Dropdown Menu with Smooth Animation */}
            <div
                className={`absolute bg-white shadow-lg rounded-lg mt-2 left-0 w-full lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    } z-10`}
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
