'use client';

import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig'; // Replace with your Firebase config path

export default function LogoutButton () {
    const handleLogout = async () => {
        try {
            await signOut(auth); // Log out the user
            console.log("User signed out successfully.");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Log Out
        </button>
    );
};

