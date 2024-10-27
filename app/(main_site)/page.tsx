import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { inter, playfairDisplay } from '../ui/fonts';
import AnimatedBackground from '../ui/background';

export const metadata: Metadata = {
  title: 'Lost & Found',
};

export default function LandingPage () {
  return (
      <div className="min-h-screen flex flex-col ">
        {/* Navbar */}
        <header className="">
          <nav className="max-w-full mx-auto px-4 mt-2 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-start">
              <Link href={"/"}>
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={0}
                  height={0}
                  style={{ width: 45, height: 'auto' }}
                  className="py-2 transition ease-in-out hover:-translate-y-1 hover:scale-110"
                />
              </Link>
            </div>
            {/* Login Link */}
            <div>
              <Link href="/login">
                <p className={`${inter.className} text-red-500 font-medium text-base transition ease-in-out hover:-translate-y-1 hover:scale-110 antialiased`}>
                  LOG IN
                </p>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        < AnimatedBackground />
        <section className="flex-1 flex items-center justify-center text-center antialiased">
          <div className="max-w-4xl px-6 mb-20 sm:mb-40">
            <h1 className={`${playfairDisplay.className} text-7xl font-bold text-gray-800 mb-8 pt-16`}>
              LOST & FOUND
            </h1>
            <p className={`${inter.className} text-2xl text-red-600 font-semibold`}>
              "Find What’s Lost, Faster"
            </p>
            <div className='mt-10 mb-5'>
              <button className='py-2 rounded-md transition ease-in-out delay-75 outline outline-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 hover:outline-none duration-300'>
                <Link href="/login" className="px-8 py-3 text-red-600 font-bold hover:text-white">
                  Get Started
                </Link>
              </button>
            </div>
            <div className=''>
              <p className={`${inter.className} px-8 md:px-28 lg:px-40 py-5 text-center break-words text-lg text-gray-800`}>
                <span className="text-red-500">Lost & Found</span> is a streamlined platform designed to help users quickly recover lost items.
                Making the process easy, efficient, and stress-free.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-24 ">
          <div className="max-w-7xl mb-32 mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 grid-cols-1 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center mb-4 mt-5">
                <Image
                  src="/Centralized.svg"
                  alt="Feature 1"
                  width={0}
                  height={0}
                  style={{ width: 300, height: 'auto' }}
                  className="transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Centralized Platform</h3>
              <p className="text-gray-600">
                Manage all your lost and found items in one
                <span className="block sm:inline">  convenient platform.</span>
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4 mt-5">
                <Image
                  src="/RealTime.svg"
                  alt="Feature 2"
                  width={0}
                  height={0}
                  style={{ width: 300, height: 'auto' }}
                  className="transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Updates</h3>
              <p className="text-gray-600">
                Stay informed with instant notifications on 
                <span className="block sm:inline"> found items.</span>
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4 mt-5">
                <Image
                  src="/SimpleEfficient.svg"
                  alt="Feature 3"
                  width={0}
                  height={0}
                  style={{ width: 300, height: 'auto' }}
                  className="transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Simple & Efficient</h3>
              <p className="text-gray-600">
                Easily track and retrieve items with
                <span className="block sm:inline"> minimal effort.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pb-2 bg-none bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-400">
            &#169; {new Date().getFullYear()} Lost & Found&#8482; . All rights reserved.
          </div>
        </footer>
      </div>
  );
};

