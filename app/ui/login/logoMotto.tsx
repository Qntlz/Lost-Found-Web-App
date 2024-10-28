import Link from "next/link";
import Image from "next/image";
import { playfairDisplay } from "../fonts";

export default function LogoMotto() {
    return (
        <div className="flex flex-col items-center justify-center bg-white text-red-400 pb-5 md:p-7 lg:p-0 lg:max-[1279px]:pb-5 lg:pb-8 md:max-lg:mt-20 xl:m-24">
            <div className="flex items-center justify-center h-48">
                <Link href={"/"}>
                    <Image
                        src="/logo.svg" // Replace with your logo path
                        alt="Logo"
                        width={0}
                        height={0}
                        style={{ width: 190, height: 'auto' }}
                        priority
                        className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                </Link>
            </div>
            <h1 className={`${playfairDisplay.className} text-4xl font-bold mb-4`}>Lost & Found</h1>
            <p className="text-lg text-center px-4 ">
                Search and Retrieve
                <span className="block"> your precious items hassle-free</span>
            </p>
        </div>
    );
}