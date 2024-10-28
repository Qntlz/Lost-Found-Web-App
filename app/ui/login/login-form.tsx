"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
    EyeIcon,
    EyeSlashIcon,
} from '@heroicons/react/24/outline';
import LogoMotto from './logoMotto';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebaseConfig';            // Make sure this is the correct path to your Firebase config
import { useRouter } from 'next/navigation';        // Import useRouter to redirect
import { inter } from '../fonts';

export default function LoginPage() {
    const router = useRouter();                     // Initialize the router
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Attempt to sign in with Firebase
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful');
            // Redirect or handle login success (e.g., push to homepage)
            router.push('/home');
        } catch (error) {
            setError("Failed to log in. Please check your email and password.");
            console.error(error);
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="relative">
            {/* Large Screen View */}
            <div className={`${inter.className} min-h-screen hidden flex-row xl:flex`}>
                {/* Left Side - Logo and Motto */}
                < LogoMotto />

                {/* Right Side - Login Form */}
                <div className="flex flex-1 items-center justify-center bg-red-400 p-4 md:p-0">
                    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                        <h2 className="text-4xl font-semibold text-center text-red-400 mb-6">Login</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-red-400">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                    />
                                    <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-red-400">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'} // Toggle between text and password 
                                        name="password"
                                        placeholder="Enter password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        minLength={8}
                                        className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                    />
                                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                    {/* Toggle password visibility icon */}
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        {showPassword ? <EyeIcon className="h-5 w-5 text-gray-500" /> : <EyeSlashIcon className="h-5 w-5 text-gray-500" />}
                                    </button>
                                </div>
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm flex items-center">
                                    <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full text-red-300 py-2 outline outline-red-300 rounded-md font-semibold hover:bg-red-700 hover:outline-none hover:text-white transition duration-300"
                            >
                                Log In
                            </button>
                        </form>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-red-400 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className={`${inter.className} flex flex-col items-center justify-center xl:hidden w-full p-8 lg:p-0    bg-white`}>
                <div className="justify-center">
                    < LogoMotto />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm md:text-lg font-medium text-red-400">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                id="emailMobile"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm md:text-lg font-medium text-red-400">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="passwordMobile"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={8}
                                className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? <EyeIcon className="h-5 w-5 text-gray-500" /> : <EyeSlashIcon className="h-5 w-5 text-gray-500" />}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm flex items-center">
                            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-red-300 outline outline-red-300 rounded-md hover:bg-red-700 hover:outline-none hover:text-white transition duration-300"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-red-400 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

