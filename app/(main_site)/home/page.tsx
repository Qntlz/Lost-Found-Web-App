import { Metadata } from 'next';
import { inter } from '@/app/ui/fonts';
import PostFeed from '@/app/ui/home/postFeed';
import ProtectedRoute from '@/app/lib/ProtectedRoute';
import { PlusIcon } from '@heroicons/react/24/outline';
import Announcements from '@/app/ui/announcement/announcements';
import AddPostButton from '@/app/ui/Post/addPostButton';
import ModalHandler from '@/app/ui/Post/modalHandler';
import AddPostModal from '@/app/ui/Post/addPostModal';

export const metadata: Metadata = {
  title: 'Homepage',
};
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

export default function Homepage() {

  return (
    <ProtectedRoute>
      <div className={`${inter.className} mt-40 md:mt-[70px] grid grid-rows-1 lg:grid-cols-5 xl:grid-cols-12`}>

        {/* Feed Header */}
        <div className="flex w-full pt-8 px-8 pb-4 z-10 fixed top-[70px] bg-white justify-end xl:right-80 xl:w-[58%] xl:pb-8 xl:top-[65px]">
          <AddPostButton/>
        </div>

        {/* Post Content */}
        <div className="lg:col-span-4 lg:col-start-2 xl:col-span-7 xl:col-start-3">
          <div className="md:mt-24">
            < PostFeed />
          </div>
        </div>

        {/* Announcements Section */}
        <div className="hidden xl:block">
          <div className="fixed lg:mt-24 lg:top-32 xl:top-0 xl:z-10">
            <Announcements />
          </div>
        </div>
          {/* Modal Handler */}
          <ModalHandler />
      </div>
    </ProtectedRoute>
  );
}



