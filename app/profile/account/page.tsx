"use client";

import { useState } from 'react';
import { updateProfile, User } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from "next/image";
import { auth } from '@/firebaseConfig';
import { inter } from '@/app/ui/fonts';

export default function UserInfo() {

    const user: User | null = auth.currentUser; // Declare user type as User | null

    const [name, setName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [avatar, setAvatar] = useState(user?.photoURL || '/logo.svg');
    const [newAvatar, setNewAvatar] = useState<File | null>(null);

    // Save all changes when "Save" button is clicked
    const handleSaveChanges = async () => {
        if (!user) {
            alert('User is not logged in');
            return;
        }

        try {
            // If there's a new avatar, upload it to Firebase Storage
            if (newAvatar) {
                await uploadAvatar(newAvatar);
            }

            // Update name if changed
            if (name !== user.displayName) {
                await updateProfile(user, { displayName: name });
            }

            alert('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Error updating profile');
        }
    };

    // Upload avatar to Firebase Storage
    const uploadAvatar = async (file: File) => {
        if (!user) {
            alert('User is not logged in');
            return;
        }

        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${user.uid}`);

        if (file.size > 10 * 1024 * 1024) {
            alert('Image must be less than 10MB');
            return;
        }

        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Update the avatar URL in Firebase
        await updateProfile(user, { photoURL: downloadURL });
        setAvatar(downloadURL); // Update local state with new avatar URL
    };

    if (!user) {
        return <div>User not found or not logged in.</div>; // Handle case where user is not logged in
    }

    return (
        <div className={`${inter.className} relative divide-y-2`}>

            <div className="mb-5">
                <h1 className="font-medium text-5xl text-red-500">Account Settings</h1>
            </div>

            <div className="flex flex-col">

                <div className="flex my-4">
                    <h2 className="font-medium text-2xl text-gray-500">Profile Details</h2>
                </div>

                <div className="container grid grid-cols-3 gap-2 divide-x-4 divide-red-400">

                    {/* Image Container */}
                    <div className="container p-3">
                        {/* Display current avatar */}
                        <div className="mb-4 flex justify-center items-center">
                            <Image
                                src={avatar}
                                alt="User Avatar"
                                width={250} height={300}
                                className="rounded-full"
                            />
                        </div>
                    </div>

                    {/* Information Container */}
                    <div className="col-span-2 p-3">
                        {/* Update name */}
                        <div className="m-4">
                            <label className="block text-base font-semibold text-gray-500">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-red-400"
                            />
                        </div>

                        {/* Display email (read-only) */}
                        <div className="m-4">
                            <label className="block text-base font-semibold text-gray-500">Email</label>
                            <input
                                type="email"
                                value={email}
                                readOnly
                                className="border border-gray-300 rounded-lg p-2 w-full bg-gray-100  hover:outline-red-400 cursor-not-allowed"
                            />
                        </div>

                        <div className="flex flex-row">

                            {/* Upload new avatar */}
                            <div className="flex m-4">
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNewAvatar(e.target.files?.[0] || null)}
                                    id="file-upload"
                                    className="hidden"
                                />
                                {/* Custom button to trigger file upload */}
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer text-red-600 px-4 py-2 border border-transparent hover:border-red-600"
                                >
                                    Change Avatar
                                </label>
                            </div>

                            {/* Save Changes Button */}
                            <div className="flex m-4 justify-center">
                                <button
                                    onClick={handleSaveChanges}
                                    className="text-green-600 px-4 py-2 border border-transparent hover:border-green-600"
                                >
                                    Save Changes
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

