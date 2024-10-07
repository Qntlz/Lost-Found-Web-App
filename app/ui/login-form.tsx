"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log({ email, password });
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side - Logo and Motto */}
            <div className="flex-1 flex flex-col items-center justify-center bg-white text-red-400 p-4 md:p-0">
                <div className="flex items-center justify-center h-48">
                    <Image
                        src="/logo.png" // Replace with your logo path
                        alt="Logo"
                        width={410}
                        height={200}
                        className="object-contain"
                    />
                </div>
                <h1 className="text-4xl font-bold mb-4">Lost & Found</h1>
                <p className="text-lg text-center px-4">
                    "Search and Retrieve your precious items hassle-free"
                </p>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center bg-red-400 p-4 md:p-0">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-4xl font-semibold text-center text-red-400 mb-6">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-red-400">
                                Email
                            </label>
                            <div className='relative'>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    required
                                    className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                />
                                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-red-400">
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    required
                                    minLength={8}
                                    className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                />
                                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-red-300 py-2 outline outline-red-300 rounded-md font-semibold hover:bg-red-300 hover:text-white transition duration-300"
                        >
                            Log In
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-red-400 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
