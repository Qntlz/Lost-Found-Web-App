'use client';

import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export default function SuccessAccount({ onGoToLogin }: { onGoToLogin: () => void }) {
    const [countdown, setCountdown] = useState(10);
    const [windowDimensions, setWindowDimensions] = useState({
        width: 0,
        height: 0,
    });

    // Set the window dimensions for the Confetti component
    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Set initial dimensions
        handleResize();

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Countdown logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        if (countdown === 0) {
            clearInterval(timer); // Clear the interval when countdown reaches 0
            onGoToLogin(); // Call the provided function to go to login
        }

        return () => clearInterval(timer); // Cleanup timer
    }, [countdown, onGoToLogin]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            {/* Confetti effect with window width and height */}
            <Confetti
                width={windowDimensions.width}
                height={windowDimensions.height}
            />

            {/* Success message */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
                <h1 className="text-2xl md:text-3xl font-bold text-red-500">
                    Account Created Successfully!
                </h1>
                <p className="mt-4 text-gray-600 text-sm md:text-base">
                    You will be redirected to the login page in {countdown} seconds.
                </p>

                {/* Button to go to login page immediately */}
                <button
                    onClick={onGoToLogin}
                    className="mt-6 px-4 py-2 md:px-6 md:py-2 font-medium text-red-500 border-2 border-transparent hover:border-red-500 rounded-lg transition-all duration-300"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
}
