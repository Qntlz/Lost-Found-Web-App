import Link from "next/link";
import NavLinks from "./nav-links";

export default function SideNav() {
    return (
    <div className="flex h-2/3 items-center justify-around flex-col px-3 py-4 4md:px-2">
        <div className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <NavLinks />
            <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        </div>
    </div>
    );
}