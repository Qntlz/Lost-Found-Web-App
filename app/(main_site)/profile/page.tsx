"use client";

import Image from "next/image";
import { inter } from "@/app/ui/fonts";
import { auth, db } from '@/firebaseConfig';
import { useState, useEffect } from 'react';
import PostFeed from "@/app/ui/home/postFeed";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import MyStats from "@/app/ui/statistics/profile/myStatistics";
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import { CameraIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";


export default function Profile() {
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
        <div className={`${inter.className} relative`}>

            {/* Desktop View */}
            <div className="hidden md:flex flex-row gap-2 divide-x-2">
                {/* Profile Section */}
                <div className="basis-[20%] mb-5 mx-4 pl-3">
                    <div className="p-5 mb-2">
                        <span className="font-semibold text-2xl text-red-500">Profile Details</span>
                    </div>

                    {/* Profile Picture */}
                    <div className="w-40 relative flex items-center justify-center mx-8 mt-6 overflow-hidden">
                        <Image
                            src={'/logo.svg'}
                            alt="User Avatar"
                            width={250}
                            height={0}
                            className="rounded-full border-2 border-gray-300 object-contain p-1"
                            priority
                        />
                        <button className="absolute bottom-2 right-2 bg-white rounded-full p-1 border-1 border-white z-10">
                            <CameraIcon className="w-6 text-black" />
                        </button>
                    </div>

                    {/* Information Container */}
                    <div className="flex flex-col justify-start my-3">
                        <div className="px-4">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    className="border p-2 rounded-md w-full"
                                />
                            ) : (
                                <span className="font-semibold text-2xl text-pretty">{name}</span>
                            )}
                        </div>
                        <div className="px-4">
                            <span className="font-light text-xl">{email}</span>
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="flex gap-2 px-4">
                            <button
                                onClick={handleSaveChanges}
                                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-400"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-400"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="flex w-full px-4">
                            <button
                                onClick={handleEditProfile}
                                className="flex w-full p-1 rounded-md justify-center bg-red-500 text-white hover:bg-red-400"
                            >
                                <PencilSquareIcon className="mx-1 w-5" />
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>

                {/* Post Section */}
                <div className="basis-[50%]">
                    <div className={`${inter.className}`}>
                        <PostFeed />
                    </div>
                </div>

                {/* Biography Section */}
                <div className="flex-1 flex-col divide-y-2 px-4">
                    <div className="flex">
                        <div className="w-full py-5">
                            <h3 className="text-2xl font-semibold mb-3 text-red-500">Bio</h3>
                            {isEditing ? (
                                <ul className="list-none space-y-3">
                                    <li>
                                        <label>School:</label>
                                        <select
                                            value={school}
                                            onChange={(e) => setSchool(e.target.value)}
                                            className="border p-2 rounded-md w-full"
                                        >
                                            <option value="">Select School</option>
                                            <option value="SBE">SBE</option>
                                            <option value="SOE">SOE</option>
                                            <option value="SAS">SAS</option>
                                            <option value="SAFAD">SAFAD</option>
                                            <option value="SLG">SLG</option>
                                            <option value="SHCP">SHCP</option>
                                            <option value="SAS">SAS</option>
                                            <option value="SED">SED</option>
                                        </select>
                                    </li>
                                    <li>
                                        <label>Course:</label>
                                        <select
                                            value={course}
                                            onChange={(e) => setCourse(e.target.value)}
                                            className="border p-2 rounded-md w-full"
                                        >
                                            <option value="">Select Course</option>
                                            <option value="BSCS">BSCS</option>
                                            <option value="BSIT">BSIT</option>
                                            <option value="BSCS">BSIS</option>
                                            <option value="BSCPE">BSCPE</option>
                                        </select>
                                    </li>
                                    <li>
                                        <label>Year Level:</label>
                                        <select
                                            value={yearLevel}
                                            onChange={(e) => setYearLevel(e.target.value)}
                                            className="border p-2 rounded-md w-full"
                                        >
                                            <option value="">Select Year Level</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="list-none">
                                    <li>School: {school || ""}</li>
                                    <li>Course: {course || ""}</li>
                                    <li>Year Level: {yearLevel || ""}</li>
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="flex flex-col">
                        <div className="flex w-full py-5">
                            <h3 className="text-2xl font-semibold mb-3 text-red-500">Statistics</h3>
                        </div>
                        <div className="">
                            < MyStats />
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex flex-col divide-y-2">

                <div className="mb-5">
                    <div className="flex mx-7 mb-7 mt-3">
                        <span className="font-semibold text-2xl text-red-500">Profile Details</span>
                    </div>

                    {/* Profile Picture */}
                    <div className="flex justify-start mx-8">
                        <Image
                            src={'/logo.svg'}
                            alt="User Avatar"
                            width={150}
                            height={0}
                            className="p-2 rounded-full outline outline-2 outline-gray-500 outline-offset-4"
                        />
                        <div className="flex justify-center items-end">
                            <button className="w-6">
                                < CameraIcon className="rounded-full outline outline-2 outline-gray-500 outline-offset-4" />
                            </button>
                        </div>
                    </div>

                    {/* Information Container */}
                    <div className="flex flex-col justify-start mx-7 mt-5 py-3">
                        <div className="">
                            <span className="font-semibold text-2xl text-pretty">Lance Cerenio</span>
                        </div>
                        <div className="">
                            <span className="font-light text-xl">{email}</span>
                        </div>
                    </div>

                    <div className="flex gap-5 my-3 ml-7">

                        <div className="flex p-1 rounded-md outline outline-offset-2 outline-1 outline-red-500 justify-center text-red-500">
                            <div className="flex justify-center">
                                < PlusIcon className="mx-1 w-8" />
                            </div>
                            <div className="flex justify-center">
                                <button className="font-medium text-xl text-nowrap">Add Post</button>
                            </div>
                        </div>

                        <div className="flex p-1 rounded-md outline outline-offset-2 outline-1 outline-red-500 justify-center text-red-500">
                            <div className="flex justify-center">
                                < PencilSquareIcon className="mx-1 w-8" />
                            </div>
                            <div className="flex justify-center">
                                <button className="font-medium text-xl text-nowrap">Edit Profile</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mx-7">
                    <div className="mt-4">
                        <span className="font-semibold text-2xl text-red-500">Posts</span>
                    </div>

                    {/* Post Section */}
                    <div className={`${inter.className} lg:col-span-7 mt-3`}>
                        < PostFeed />
                    </div>
                </div>

            </div>
        </div>
    );
}