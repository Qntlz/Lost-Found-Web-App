import { Metadata } from 'next';
import { inter } from '@/app/ui/fonts';
import ProtectedRoute from '@/app/lib/ProtectedRoute';
import Announcements from '@/app/ui/announcement/announcements';
import Feed from '@/app/ui/home/feed';

export const metadata: Metadata = {
  title: 'Homepage',
};
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

export default function Homepage() {

  return (
    <ProtectedRoute>
      <div className={`${inter.className}mt-20 md:mt-[70px] grid grid-rows-1 lg:grid-cols-5 xl:grid-cols-12 divide-x-2`}>

        {/* Post Content */}
        <div className="lg:col-span-4 lg:col-start-2 xl:col-span-7 xl:col-start-3">
          <div className="">
            < Feed />
          </div>
        </div>

        {/* Announcements Section */}
        <div className="hidden xl:block xl:mt-8">
          <div className="fixed lg:mt-24 lg:top-32 xl:top-0 xl:z-10">
            <Announcements />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}



