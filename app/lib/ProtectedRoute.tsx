"use client";

import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import useAuth from '../../useAuth';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login'); // Redirect to login if not authenticated
        }
    }, [user, loading, router]);

    // // Optional: Display a loading state while checking authentication
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // Render children if authenticated
    return <>{user && children}</>;
}


