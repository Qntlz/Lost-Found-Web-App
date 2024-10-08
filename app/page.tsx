import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { playfairDisplay, inter } from './ui/fonts';

export const metadata: Metadata = {
  title: 'Lost & Found',
};

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[url('/Background.svg')] bg-contain">
      {/* Navbar */}
      <header className="shadow-md">
        <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-start">
            <Link href={"/"}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={200}
                className="object-contain"
              />
            </Link>
          </div>
          {/* Login Link */}
          <div>
            <Link href="/login">
              <p className={`${inter.className} text-red-500 font-bold text-xl transition-transform ease-in-out duration-300 hover:scale-110`}>
                LOG IN
              </p>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center text-center">
        <div className="max-w-4xl px-6 mb-40">
          <h1 className={`${playfairDisplay.className} text-7xl font-bold text-gray-800 mb-8 pt-16`}>
            LOST & FOUND
          </h1>
          <p className={`${inter.className} text-2xl text-red-600 font-extrabold`}>
            "Find What’s Lost, Faster"
          </p>
          <div className='mt-10 mb-5'>
            <button className='py-2 rounded-md transition ease-in-out delay-75 outline outline-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300'>
              <Link href="/login" className="px-8 py-3 text-red-600 font-bold hover:text-white">
                Get Started
              </Link>
            </button>
          </div>
          <div className=''>
            <p className={`${inter.className} px-4 md:px-20 lg:px-40 text-center py-5 text-pretty text-lg text-gray-800`}>
              Lost & Found is a streamlined platform designed to help users quickly recover lost items.
              With real-time updates and an intuitive interface, it connects those who’ve lost items with
              the people who find them, making the process simple, efficient, and stress-free.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mb-40 mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 grid-cols-1 md:grid-cols-3">
          <div className="text-center">
            <div className="flex justify-center mb-4 mt-5">
              <Image
                src="/Centralized.png"
                alt="Feature 1"
                width={300}
                height={450}
                className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Centralized Platform</h3>
            <p className="text-gray-600">
              Manage all your lost and found items in one convenient platform.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4 mt-5">
              <Image
                src="/RealTime.png"
                alt="Feature 2"
                width={300}
                height={450}
                className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Updates</h3>
            <p className="text-gray-600">
              Stay informed with instant notifications on found items.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4 mt-5">
              <Image
                src="/SimpleEfficient.png"
                alt="Feature 3"
                width={300}
                height={450}
                className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Simple & Efficient</h3>
            <p className="text-gray-600">
              Easily track and retrieve items with minimal effort.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-400">
          &#169; {new Date().getFullYear()} Lost & Found&#8482; . All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
