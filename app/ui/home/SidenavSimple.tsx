import Link from "next/link"
import NavLinks from "./nav-links"
import UsernameDisplay from '@/app/lib/getUsername';

export default function SideNavXL() {
    return (

        <div className="hidden lg:block ml-8 fixed z-10 lg:top-24 xl:top-24">
            <span className="font-semibold text-2xl text-red-500">Dashboard</span>
            <ul className="mt-4 mb-8">
                <li>
                    <Link href={'/home'}><UsernameDisplay /></Link>
                </li>
                <li>
                    <Link href={'/home'}>BSCS - 2</Link>
                </li>
            </ul>
            < NavLinks />
        </div>
    );
}