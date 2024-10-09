'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AtSymbolIcon, KeyIcon, UserCircleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [passwordConditions, setPasswordConditions] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'password') {
            validatePassword(value);
        }
    };

    const validatePassword = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$*&]/.test(password);

        setPasswordConditions({
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialChar,
        });

        setIsPasswordValid(
            hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && password.length >= 8
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPasswordValid) {
            // Handle form submission logic here
            console.log('Form submitted:', formData);
        } else {
            console.log('Password is invalid');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-[url('/Background.svg')] bg-contain rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-red-400 mb-6">Create an Account</h2>
                <div className=' flex items-center justify-center'>
                    <Image
                        src="/logo.png" // Replace with your logo path
                        alt="Logo"
                        width={150}
                        height={0}
                        className="items-center"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-red-700 pt-2">Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                placeholder="Your Name"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-red-700">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                placeholder="you@example.com"
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-red-700">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                placeholder="Your Password"
                                minLength={8}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className={`w-full bg-red-400 text-white py-2 rounded-md font-semibold hover:bg-red-300 transition duration-300 ${!isPasswordValid ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={!isPasswordValid}
                    >
                        Sign Up
                    </button>

                    {/* Password requirement hints with icons */}
                    <div className="mt-4 text-sm text-gray-600">
                        <p>Password must contain:</p>
                        <ul className="list-none space-y-2">
                            <li className="flex items-center">
                                {passwordConditions.hasUpperCase ? (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                ) : (
                                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                )}
                                At least one uppercase letter
                            </li>
                            <li className="flex items-center">
                                {passwordConditions.hasLowerCase ? (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                ) : (
                                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                )}
                                At least one lowercase letter
                            </li>
                            <li className="flex items-center">
                                {passwordConditions.hasNumber ? (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                ) : (
                                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                )}
                                At least one number
                            </li>
                            <li className="flex items-center">
                                {passwordConditions.hasSpecialChar ? (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                ) : (
                                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                )}
                                At least one special character (!, @, #, $, *, &)
                            </li>
                        </ul>
                    </div>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-red-600 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;