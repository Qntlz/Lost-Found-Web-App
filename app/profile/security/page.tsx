"use client";

import { useState, useCallback, useEffect } from 'react';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, User } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { useDebounce } from 'use-debounce';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';

export default function SecuritySettings() {
    const user: User | null = auth.currentUser;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [inputStyle, setInputStyle] = useState('border-2 border-gray-300 focus:outline-gray-500'); // Red by default
    const [showPassword, setShowPassword] = useState(false); // State for password visibility


    // Debounced value for current password, delayed by 300ms
    const [debouncedPassword] = useDebounce(currentPassword, 1000);

    // Password verification after debounce
    const handlePasswordVerification = useCallback(async () => {
        if (!user) {
            alert('User is not logged in');
            return;
        }

        const credential = EmailAuthProvider.credential(user.email!, debouncedPassword);
        try {
            // Verify current password using Firebase
            await reauthenticateWithCredential(user, credential);
            setPasswordValid(true); // Password is correct
            setInputStyle('border-2 border-green-500 focus:outline-green-500'); // Change outline to green
        } catch (error) {
            setPasswordValid(false); // Invalid password
            setInputStyle('border-2 border-red-500 focus:outline-red-500'); // Keep outline red
            console.error('Error verifying password:', error);
        }
    }, [debouncedPassword, user]);

    // Run password verification when the debounced password changes
    useEffect(() => {
        if (debouncedPassword) {
            handlePasswordVerification();
        }
    }, [debouncedPassword, handlePasswordVerification]);

    // Handle password change
    const handleChangePassword = async () => {
        if (!user || !passwordValid) {
            alert('You must verify your current password first.');
            return;
        }

        try {
            await updatePassword(user, newPassword);
            alert('Password changed successfully!');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Error updating password');
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className={`${inter.className} relative divide-y-2`}>

            <div className="mb-5">
                <h1 className="font-medium text-5xl text-red-500">Security Settings</h1>
            </div>

            <div className="container grid-cols-3">

                {/* Update Password Div */}
                <div className="max-w-md p-4">

                    <div className="flex my-4">
                        <h2 className="font-medium text-2xl text-gray-500">Profile Details</h2>
                    </div>

                    {/* Current Password Field */}
                    <div className="mb-4 relative">
                        <label className="block text-base font-semibold text-gray-500">Current Password</label>

                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className={`border rounded-lg p-2 w-full pr-10 ${inputStyle}`} // Add right padding for the icon
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-9" // Adjust positioning
                        >
                            {showPassword ? (
                                <EyeIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                            )}
                        </button>
                    </div>


                    {/* New Password Field (Disabled until current password is verified) */}
                    <div className="mb-4 relative">
                        <label className="block text-base font-semibold text-gray-500">New Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="rounded-lg p-2 w-full border-2 border-gray-300 focus:outline-gray-500"
                            disabled={!passwordValid} // Only enabled if current password is valid
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-9" // Adjust positioning
                        >
                            {showPassword ? (
                                <EyeIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                            )}
                        </button>
                    </div>

                    <button
                        onClick={handleChangePassword}
                        className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ${!passwordValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!passwordValid} // Only clickable if current password is valid
                    >
                        Change Password
                    </button>
                </div>

            </div>

        </div>
    );
}
