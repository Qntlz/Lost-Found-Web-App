import Link from "next/link";
import Image from "next/image";
import { playfairDisplay } from "../fonts";

export default function LogoMotto() {
    return (
        <div className="flex flex-col items-center justify-center bg-white text-red-500 pb-5 md:p-7 lg:p-0 lg:pb-8 xl:m-24">
            <div className="flex items-center justify-center">
                <Link href={"/"}>
                    <Image
                        src="/logo.svg" // Replace with your logo path
                        alt="Logo"
                        width={0}
                        height={0}
                        className="w-[150px] transition-transform duration-300 ease-in-out hover:scale-110 portrait-1024:w-[250px]"
                        priority
                    />
                </Link>
            </div>
            <h1 className={`${playfairDisplay.className} text-4xl font-bold mb-4 portrait-1024:text-5xl xl:text-5xl`}>Lost & Found</h1>
            <p className="text-lg text-center text-gray-500 px-4 portrait-1024:text-xl">
                Search and Retrieve
                <span className="block"> your precious items hassle-free</span>
            </p>
        </div>
    );
}