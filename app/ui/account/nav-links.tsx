"use client";

import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


// Map of links to display in the side navigation.

const links = [
    { name: 'Account', href: '/profile/account', icon: UserIcon },
    { name: 'Security', href: '/profile/security', icon: LockClosedIcon },
];

export default function NavLinks() {
    const pathname = usePathname();
  
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-base font-medium hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'text-red-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }