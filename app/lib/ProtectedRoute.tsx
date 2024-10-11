"use client";

import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import useAuth from '../../useAuth';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/'); // Redirect to landing page if not authenticated  change to: '/login' to redirect to login
        }
    }, [user, loading, router]);

    /*
    Protected Route Testing
    useEffect(() => {
        if (!loading) {
            router.push('/login'); // Redirect to login if not authenticated
        }
    }, [loading, router]);
    */

    // if (loading) {
    //     return <div>Loading...</div>; // Show loading while authentication state is being checked
    // }

    return <>{user && children}</>; // Render the component if authenticated
};

export default ProtectedRoute;
