'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Home', href: '/home'},
    { name: 'Chats', href: '/chat'},
    { name: 'My Post', href: '/post/edit'},
    { name: 'Saved', href: '/saved'},
    { name: 'Archives', href: '/archives'},
    { name: 'Announcement', href: '/announcement'},
  ]

export default function NavLinks() {
    const pathname = usePathname();

    return(
        <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-red-100 text-red-500': pathname === link.href,
              },
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
    );
}