'use client';

import Link from 'next/link';
import Image from 'next/image';
import { inter } from '../fonts';
import React, { useState } from 'react';
import { auth,db } from '@/firebaseConfig';
import SuccessAccount from './successful';
import { useRouter } from 'next/navigation';
import { updateProfile } from 'firebase/auth';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AtSymbolIcon, KeyIcon, UserCircleIcon, CheckCircleIcon, 
XCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { doc, setDoc } from "firebase/firestore"; 

export default function SignUpForm() {
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
                console.log("User signed up:", user);
    
                // Update profile to include the name
                await updateProfile(user, {
                    displayName: formData.name,
                });
                console.log("User signed up and profile updated:", user);
    
                // Store user metadata in Firestore
                const userRef = doc(db, "users", user.uid); // Reference to the user's document
                await setDoc(userRef, {
                    uid: user.uid,
                    name: formData.name,
                    email: formData.email,
                    createdAt: new Date(),
                });
                console.log("User data stored in Firestore");
                setShowSuccess(true);
                
            } catch (error: any) {
                if (error.code === "auth/email-already-in-use") {
                    setError("This email is already registered. Please use a different email or log in.");
                } else {
                    setError(error.message);
                }
                console.log("Error signing up:", error.message);
            }
        } else {
            console.log("Password is invalid");
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
        <div className={`${inter.className} min-h-screen flex`}>

            {/* Mobile Screens */}
            <div className="w-full p-8 md:pt-16 lg:hidden">
                <h2 className={`mb-6 font-bold text-2xl md:text-4xl text-center text-red-400`}>Create Account</h2>
                <div className='flex items-center justify-center'>
                    <Image
                        src="/logo.svg" // Replace with your logo path
                        alt="Logo"
                        width={0}
                        height={0}
                        style={{ width: 100, height: 'auto' }}
                        className="items-center transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block pt-2 font-medium text-sm md:text-lg text-gray-600 md:pt-4">Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="nameMobile"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                placeholder="Your Name"
                                autoComplete='No'
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-red-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 md:text-lg">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                id="emailMobile"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                placeholder="you@example.com"
                                autoComplete='No'
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-red-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 md:text-lg">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                                id="passwordMobile"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                placeholder="Your Password"
                                minLength={8}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-red-500 peer-focus:text-gray-900" />
                            {/* Toggle password visibility icon */}
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? <EyeIcon className="h-5 w-5 text-red-500" /> : <EyeSlashIcon className="h-5 w-5 text-red-500" />}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {/* Password requirement hints with icons */}
                    <div className="mt-4 text-sm md:text-base text-gray-600">
                        <p className="mb-2 font-bold">Password must contain:</p>
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

                            <li className="flex items-start">
                                {passwordConditions.hasSpecialChar ? (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                ) : (
                                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                )}
                                <div>
                                    <p>At least one special character <span className="hidden text-red-500 min-425:inline">(!, @, #, $, *, &)</span>
                                        <span className="block text-red-500 min-425:hidden">(!, @, #, $, *, &)</span>
                                    </p>
                                </div>
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
                        className={`w-full bg-red-500 text-white py-2 mt-4 rounded-md font-semibold hover:bg-red-700 transition duration-300 ${!isPasswordValid ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={!isPasswordValid}
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-red-600 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>

            {/* Ipad Pro */}
            <div className="hidden portrait-1024:flex w-full">
                <div className="w-full p-8 pt-16">
                    <h2 className={`mb-6 font-bold text-5xl text-center text-red-400`}>Create Account</h2>
                    <div className='flex items-center justify-center'>
                        <Image
                            src="/logo.svg" // Replace with your logo path
                            alt="Logo"
                            width={0}
                            height={0}
                            style={{ width: 200, height: 'auto' }}
                            className="items-center transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block font-medium text-xl text-gray-600 pt-4">Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="nameIpad"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-400 rounded-md
                                               focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparen 
                                               placeholder:text-gray-500"
                                    placeholder="Your Name"
                                    autoComplete='No'
                                />
                                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                                -translate-y-1/2 text-red-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-xl font-medium text-gray-600">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="emailIpad"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-400 rounded-md 
                                               focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent 
                                               placeholder:text-gray-500"
                                    placeholder="you@example.com"
                                    autoComplete='No'
                                />
                                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                                -translate-y-1/2 text-red-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-xl font-medium text-gray-600">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'} // Toggle between text and password
                                    id="passwordIpad"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-400 rounded-md 
                                               focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent 
                                               placeholder:text-gray-500"
                                    placeholder="Your Password"
                                    minLength={8}
                                />
                                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                                -translate-y-1/2 text-red-500 peer-focus:text-gray-900" />

                                {/* Toggle password visibility icon */}
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? <EyeIcon className="h-5 w-5 text-red-500" /> : <EyeSlashIcon className="h-5 w-5 text-red-500" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

                        {/* Password requirement hints with icons */}
                        <div className="mt-4 text-lg text-gray-600">
                            <p className="mb-2 font-bold">Password must contain:</p>
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

                                <li className="flex items-start">
                                    {passwordConditions.hasSpecialChar ? (
                                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                    ) : (
                                        <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                    )}
                                    <div>
                                        <p>At least one special character <span className="text-red-500">(!, @, #, $, *, &)</span>
                                        </p>
                                    </div>
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
                            className={`w-full text-xl bg-red-500 text-white py-2 mt-4 rounded-md font-semibold hover:bg-red-700
                                 transition duration-300 ${!isPasswordValid ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={!isPasswordValid}
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-6 text-lg text-center text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-red-600 hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>

            {/* Larger Screens */}
            <div className="hidden w-full portrait-1024:hidden lg:flex">
                <div className="flex basis-[20%]">
                    {/* Aesthetics */}
                    <div className="animated-bg hidden md:block">
                        <div className="icon bg-[url('/4.svg')] animate-drift4 bottom-[25%] left-[5%]"></div>
                        <div className="icon bg-[url('/3.svg')] animate-drift3 top-[35%] left-[9%]"></div>
                        <div className="icon bg-[url('/5.svg')] animate-drift5 top-[10%] left-[5%]"></div>
                    </div>
                </div>
                <div className="flex w-full flex-col lg:mt-10">

                    <div className="mx-6 mb-12">
                        <h2 className={`font-bold text-5xl text-red-400`}>Create Account</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-x-5">
                            {/* Input Fields Container */}
                            <div className="flex flex-col basis-1/2">
                                {/* Name Input */}
                                <div className="m-4 ml-6">
                                    <label htmlFor="name" className="block font-medium text-xl text-gray-600">Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-400 rounded-md
                                                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparen 
                                                        placeholder:text-gray-500"
                                            placeholder="Your Name"
                                            autoComplete='No'
                                        />
                                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                                            -translate-y-1/2 text-red-500 peer-focus:text-gray-900" />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="m-4 ml-6">
                                    <label htmlFor="email" className="block text-xl font-medium text-gray-600">Email</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-400 rounded-md 
                                                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent 
                                                        placeholder:text-gray-500"
                                            placeholder="you@example.com"
                                            autoComplete='No'
                                        />
                                        <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                                            -translate-y-1/2 text-red-500 peer-focus:text-gray-900" />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="m-4 ml-6">
                                    <label htmlFor="password" className="block text-xl font-medium text-gray-600">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'} // Toggle between text and password
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-400 rounded-md 
                                                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent 
                                                        placeholder:text-gray-500"
                                            placeholder="Your Password"
                                            minLength={8}
                                        />
                                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                                            -translate-y-1/2 text-red-500 peer-focus:text-gray-900" />

                                        {/* Toggle password visibility icon */}
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            {showPassword ? <EyeIcon className="h-5 w-5 text-red-500" /> : <EyeSlashIcon className="h-5 w-5 text-red-500" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && <p className="text-red-500 text-lg mb-4">{error}</p>}
                            </div>

                            {/* Requirements Fields Container */}
                            <div className="flex grow mx-10">
                                <div className="mt-4 text-lg text-gray-600 w-full">
                                    <p className='mb-2 font-bold'>Password must contain:</p>
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

                                        <li className="flex items-start">
                                            {passwordConditions.hasSpecialChar ? (
                                                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-1" />
                                            ) : (
                                                <XCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-1" />
                                            )}
                                            <div>
                                                <p>At least one special character <span className="hidden md:inline-block text-red-500">(!, @, #, $, *, &)</span>
                                                    <span className="block md:hidden ml-16 text-red-500">(!, @, #, $, *, &)</span>
                                                </p>
                                            </div>
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
                            </div>
                        </div>
                        {/* Sign Up Button */}
                        <div className="mx-6">
                            <button
                                type="submit"
                                className={`w-full py-2 text-xl font-semibold bg-red-500 text-white rounded-md hover:bg-red-700
                                        transition duration-300 ${!isPasswordValid ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={!isPasswordValid}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mx-6 mt-3 text-lg text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-red-600 hover:underline">
                            Log In
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

