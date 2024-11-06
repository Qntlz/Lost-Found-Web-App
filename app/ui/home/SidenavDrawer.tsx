import Link from 'next/link';
import Image from 'next/image';
import UsernameDisplay from '@/app/lib/getUsername';
import SignOutButton from '../header/signout';
import {
    ChatBubbleLeftRightIcon,
    HomeIcon,
    ArchiveBoxArrowDownIcon,
    PencilSquareIcon,
    XMarkIcon, MegaphoneIcon
} from '@heroicons/react/24/solid';


export default function SideNav({ show, closeNav }: { show: boolean; closeNav: () => void }) {
    // console.log(show); // Checking Purposes


    return (
        <div className={`w-72 md:w-[310px] min-820:w-[325px] min-h-screen absolute top-0 transition-all duration-700 bg-white
            ${show ? 'left-0' : '-left-full'} text-red-500 border border-r-red-500 border-b-red-500 z-10`}>

            {/* Header */}
            <div className="flex justify-between mt-4">
                {/* Logo */}
                <div className="ml-6">
                    <Image
                        src={'./logo.svg'} // User's avatar URL
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="object-contain"
                        priority
                    />
                </div>
                {/* Close button (XMarkIcon) */}
                <div className="flex justify-end">
                    <button onClick={closeNav} className="mr-2">
                        <XMarkIcon className="w-8 text-gray-600 cursor-pointer" />
                    </button>
                </div>
            </div>

            {/* Profile Picture */}
            <div className="xl:hidden flex flex-col items-center justify-center">
                {/* User Image */}
                <div className="my-8">
                    <Image
                        src={'/logo.svg'}
                        alt="User Avatar"
                        width={150}
                        height={150} // Set height to maintain the aspect ratio of the image
                        className="p-2 rounded-full outline outline-2 outline-gray-500 outline-offset-4"
                    />
                </div>

                {/* Centered User Name and Edit Profile Button */}
                <div className="flex flex-col items-center">
                    {/* User Name */}
                    <div className="mb-5 text-xl text-center">
                        < UsernameDisplay />
                    </div>

                    {/* Edit Profile Button */}
                    <div className="flex items-center w-fit px-2 rounded-xl outline outline-offset-2 outline-1 outline-red-500 text-red-500">
                        <PencilSquareIcon className="w-6" />
                        <Link href={'/profile'} onClick={closeNav} className="font-medium text-sm text-nowrap pl-1">
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>

            {/* SideNav content */}
            <div className="mt-7 mx-7 pb-28">
                <Link href={'/home'} onClick={closeNav} className="py-2 rounded-lg flex items-center">
                    <HomeIcon className="h-6 w-6 mr-2" />
                    Home
                </Link>
                <Link href={'/home'} onClick={closeNav} className="py-2 rounded-lg flex items-center">
                    <MegaphoneIcon className="h-6 w-6 mr-2" />
                    Announcements
                </Link>
                <Link href={'/home'} onClick={closeNav} className="py-2 rounded-lg flex items-center">
                    <PencilSquareIcon className="h-6 w-6 mr-2 -rotate-[20deg]" />
                    My Posts
                </Link>
                <Link href={'/home'} onClick={closeNav} className="py-2 rounded-lg flex items-center">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2" />
                    Chats
                </Link>
                <Link href={'/home'} onClick={closeNav} className="py-2 rounded-lg flex items-center">
                    <ArchiveBoxArrowDownIcon className="h-6 w-6 mr-2" />
                    Archives
                </Link>
            </div>

            {/* Utilities */}
            <div className=" xl:hidden mx-7 border-t border-t-red-500 py-2 space-y-1">
                <Link href={'/home'}>
                    Settings
                </Link>
                < SignOutButton />
            </div>

        </div>
    );
}

