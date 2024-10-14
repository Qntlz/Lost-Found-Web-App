import { Metadata } from 'next';
import ProtectedRoute from '../lib/ProtectedRoute';
import LogoutButton from '../ui/signout';
import { inter } from '../ui/fonts';
import Header from '../ui/home/header';
import Sidebar from '../ui/home/sidebar';
import PostFeed from '../ui/home/postFeed';
import Announcements from '../ui/home/announcements';


export const metadata: Metadata = {
  title: 'Homepage',
};
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

export default function Homepage() {
  return (
    <ProtectedRoute>

      <div className="min-h-screen">
        {/* Header Section */}
        < Header />
        
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
          <div className="lg:col-span-3 p-4 rounded-lg mt-3">
             < Announcements />
          </div>
        </div>
      </div>
      <LogoutButton />
    </ProtectedRoute>
  );
}
