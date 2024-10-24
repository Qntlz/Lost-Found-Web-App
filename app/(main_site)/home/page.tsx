import { Metadata } from 'next';
import ProtectedRoute from '@/app/lib/ProtectedRoute';
import { inter } from '@/app/ui/fonts';
import Header from '@/app/ui/home/header/navbar';
import Sidebar from '@/app/ui/home/sidebar';
import PostFeed from '@/app/ui/home/postFeed';
import Announcements from '@/app/ui/announcement/announcements';


export const metadata: Metadata = {
  title: 'Homepage',
};
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

export default function Homepage() {
  return (
    <ProtectedRoute>

      <div className="min-h-screen">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-x-4 p-4">

          {/* Left Sidebar */}
          <div className="lg:col-span-2">
            < Sidebar />
          </div>

          {/* Post Section */} 
          <div className={`${inter.className} lg:col-span-7 mt-3`}>
            < PostFeed />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 p-4 mt-3">
             < Announcements />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
