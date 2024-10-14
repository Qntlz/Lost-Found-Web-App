import Link from "next/link";
import Image from "next/image";

export default function LogoMotto() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-white text-red-400 p-4 md:p-0">
            <div className="flex items-center justify-center h-48">
                <Link href={"/"}>
                    <Image
                        src="/logo.svg" // Replace with your logo path
                        alt="Logo"
                        width={190}
                        height={200}
                        className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                </Link>
            </div>
            <h1 className="text-4xl font-bold mb-4">Lost & Found</h1>
            <p className="text-lg text-center px-4">
                "Search and Retrieve your precious items hassle-free"
            </p>
        </div>

    );
}