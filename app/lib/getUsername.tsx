"use client"

import { auth } from '@/firebaseConfig';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export default function UsernameDisplay () {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        // Set up the onAuthStateChanged listener
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserName(user ? user.displayName : null);
        });

        // Clean up the listener on unmount
        return unsubscribe;
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentUser = auth.currentUser;
            if (currentUser && currentUser.displayName !== userName) {
                setUserName(currentUser.displayName);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [userName]);

    return <div>{userName}</div>;
};
