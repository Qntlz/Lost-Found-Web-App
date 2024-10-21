'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AtSymbolIcon, KeyIcon, UserCircleIcon, CheckCircleIcon, XCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebaseConfig'; // Import Firebase auth configuration
import { useRouter } from 'next/navigation'; // Import useRouter to redirect
import { updateProfile } from 'firebase/auth'; // Make sure to import updateProfile
import SuccessAccount from './successful';
import { inter } from '../fonts';

export default function SignupForm() {
    const router = useRouter(); // Initialize the router

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
        hasMinLength: false, // Add password length condition
    });

    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [error, setError] = useState<string | null>(null); // To handle errors
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [showSuccess, setShowSuccess] = useState(false); // New state to show success message

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
        const hasMinLength = password.length >= 8; // Check if password length is >= 8

        setPasswordConditions({
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialChar,
            hasMinLength, // Update state with length condition
        });

        setIsPasswordValid(
            hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error state

        if (isPasswordValid) {
            try {
                // Firebase authentication
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;
                console.log('User signed up:', user);

                // Update profile to include the name
                await updateProfile(user, {
                    displayName: formData.name,
                });
                console.log('User signed up and profile updated:', user);

                // You can redirect to the login page
                // router.push('/login');

                setShowSuccess(true);

            } catch (error: any) {
                if (error.code === 'auth/email-already-in-use') {
                    setError('This email is already registered. Please use a different email or log in.');
                } else {
                    setError(error.message);
                }
                console.log('Error signing up:', error.message);
            }
        } else {
            console.log('Password is invalid');
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const goToLogin = () => {
        router.push('/login');
    };

    // If sign-up is successful, show the Successful component
    if (showSuccess) {
        return <SuccessAccount onGoToLogin={goToLogin} />;
    }

    return (
        <div className={`${inter.className} min-h-screen flex items-center justify-center`}>
            <div className="w-full max-w-md p-8 bg-[url('/Background.svg')] bg-contain rounded-lg shadow-md">
                <h2 className={`text-2xl font-bold text-center text-red-400 mb-6`}>Create Account</h2>
                <div className='flex items-center justify-center'>
                    <Image
                        src="/logo.svg" // Replace with your logo path
                        alt="Logo"
                        width={100}
                        height={0}
                        className="items-center transition-transform duration-300 ease-in-out hover:scale-110"
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
                                type={showPassword ? 'text' : 'password'} // Toggle between text and password
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

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {/* Password requirement hints with icons */}
                    <div className="mt-4 text-sm text-gray-600">
                        <p className='mb-1'>Password must contain:</p>
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
                            <li className="flex items-center">
                                {passwordConditions.hasMinLength ? (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                ) : (
                                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                )}
                                At least 8 characters
                            </li>
                        </ul>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className={`w-full bg-red-400 text-white py-2 mt-4 rounded-md font-semibold hover:bg-red-700 transition duration-300 ${!isPasswordValid ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={!isPasswordValid}
                    >
                        Sign Up
                    </button>

                </form>

                <p className="mt-6 text-start text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-red-600 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

