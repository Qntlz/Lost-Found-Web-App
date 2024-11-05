"use client";

import Image from "next/image";
import { inter } from "@/app/ui/fonts";
import { auth, db } from '@/firebaseConfig';
import { useState, useEffect, useRef } from 'react';
import PostFeed from "@/app/ui/home/postFeed";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import MyStats from "@/app/ui/statistics/profile/myStatistics";
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import { CameraIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";


export default function Profile() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false); // To toggle edit mode
    const [tempName, setTempName] = useState<string>(''); // Temporary state for name while editing
    const [school, setSchool] = useState<string>(''); // School select option
    const [course, setCourse] = useState<string>(''); // Course select option
    const [yearLevel, setYearLevel] = useState<string>(''); // Year Level select option

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');


        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const newName = currentUser.displayName || '';
                const newEmail = currentUser.email || '';

                setName(newName);
                setEmail(newEmail);

                localStorage.setItem('name', newName);
                localStorage.setItem('email', newEmail);

                // Fetch additional details from Firestore
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setSchool(userData.school || '');
                    setCourse(userData.course || '');
                    setYearLevel(userData.yearLevel || '');
                }

            }
        });

        return () => unsubscribe();
    }, []);

    const currentUser = auth.currentUser; // Get current user details

    // Toggle edit mode
    const handleEditProfile = () => {
        setIsEditing(true);
        setTempName(name); // Set temporary name to current name for editing
    };

    // Cancel edit and revert changes
    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus(); // Focus the input when editing is enabled
        }
    }, [isEditing]); // Run this effect whenever isEditing changes

    // Save profile changes
    const handleSaveChanges = async () => {
        if (currentUser) {
            try {
                // Update Firebase profile name
                await updateProfile(currentUser, { displayName: tempName });

                // Save additional details to Firestore
                const userRef = doc(db, 'users', currentUser.uid);
                await setDoc(userRef, {
                    school: school,
                    course: course,
                    yearLevel: yearLevel
                }, { merge: true }); // Use merge to update without overwriting

                // Update state with new values
                setName(tempName);
                setIsEditing(false); // Exit edit mode
                console.log('Profile updated successfully');
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };

    return (
        <div className={`${inter.className} mt-20 grid grid-rows divide-y-2 md:divide-y-0 md:divide-x-2 md:grid-cols-5`}>

            {/* Profile Section */}
            <div className="mb-8 md:col-span-2 md:fixed md:top-[90px]">
                {/* Profile Picture */}
                <div>
                    <div className="mx-7 mt-3">
                        <span className="font-semibold text-2xl text-red-500">Profile Details</span>
                    </div>
                    <div className="mt-8 mx-8">
                        <Image
                            src={'/logo.svg'}
                            alt="User Avatar"
                            width={150}
                            height={0}
                            className="p-2 rounded-full outline outline-2 outline-gray-500 outline-offset-4"
                        />
                    </div>
                </div>

                {/* information */}
                <div className="mx-8 mt-5">
                    <div>
                        {isEditing ? (
                            <input
                                ref={inputRef}
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                className="border p-2 rounded-md w-1/2 md:w-full border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            />
                        ) : (
                            <span className="font-semibold text-2xl text-pretty">{name}</span>
                        )}
                    </div>
                    <div>
                        {isEditing ? (
                            <span className="hidden font-light text-xl">{email}</span>
                        ) : (
                            <span className="font-light text-xl">{email}</span>
                        )}
                    </div>
                </div>

                {/* Operations */}
                <div className="flex mt-5 mx-8">
                    {isEditing ? (
                        <div className="flex gap-5">
                            <div className="h-7">
                                <button
                                    onClick={handleSaveChanges}
                                    className="px-2 rounded-sm outline outline-offset-2 outline-1 outline-green-500 text-green-500"
                                >
                                    Save
                                </button>
                            </div>
                            <div className="h-7">
                                <button
                                    onClick={handleCancelEdit}
                                    className="px-2 rounded-sm outline outline-offset-2 outline-1 outline-red-500 text-red-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Edit Profile
                        <div className="flex p-1 rounded-sm outline outline-offset-2 outline-1 outline-red-500 justify-center text-red-500">
                            <div className="flex justify-center">
                                < PencilSquareIcon className="mx-1 w-5" />
                            </div>
                            <div className="flex justify-center">
                                <button onClick={handleEditProfile} className="font-medium text-base text-nowrap">Edit Profile</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Post Section */}
            <div className="pt-5 md:col-span-3 md:col-start-3">
                <div className="sticky pt-2 pb-8 top-[75px] z-10 bg-white md:pt-7 md:fixed md:w-full lg:top-[70px]">
                    <span className="mx-8 text-2xl font-semibold text-red-500">My Posts</span>
                </div>
                <div className="md:mt-16">
                    < PostFeed />
                </div>
            </div>
        </div>
    );
}