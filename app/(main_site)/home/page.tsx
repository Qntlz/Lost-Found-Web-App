import Link from 'next/link';
import { Metadata } from 'next';
import { inter } from '@/app/ui/fonts';
import PostFeed from '@/app/ui/home/postFeed';
import ProtectedRoute from '@/app/lib/ProtectedRoute';
import { PlusIcon } from '@heroicons/react/24/outline';
import Announcements from '@/app/ui/announcement/announcements';

export const metadata: Metadata = {
  title: 'Homepage',
};
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

export default function Homepage() {

  return (
    <ProtectedRoute>
      <div className={`${inter.className} mt-20 md:mt-[70px] grid grid-rows-1 lg:grid-cols-5 xl:grid-cols-12`}>

        {/* Post Content */}
        <div className="lg:col-span-4 lg:col-start-2 xl:col-span-7 xl:col-start-3">

          <div className="w-fit p-1 rounded-md border border-red-500 text-red-500 mt-7 mr-7 justify-self-end">
            <Link href={'/post/make'} className="flex font-normal text-sm text-nowrap items-center">
              <PlusIcon className="mx-1 w-5" />
              Add Item
            </Link>

          </div>
          <div className="h-[70vh] mt-7 overflow-y-scroll">
            < PostFeed />
          </div>
        </div>

        {/* Announcements Section */}
        <div className="hidden xl:block">
          <div className="fixed lg:mt-24 lg:top-32 xl:top-0 xl:z-10">
            <Announcements />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}



