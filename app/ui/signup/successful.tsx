'use client';

// Confetti Effects after Sign-up

import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export default function SuccessAccount({ onGoToLogin }: { onGoToLogin: () => void }) {
    const [countdown, setCountdown] = useState(10);

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Confetti effect */}
            <Confetti />

            {/* Success message */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-red-500">Account Created Successfully!</h1>
                <p className="mt-4 text-gray-600">You will be redirected to the login page in {countdown} seconds.</p>

                {/* Button to go to login page immediately */}
                <button
                    className="mt-4 px-6 py-2 font-medium text-red-500 border-2 border-transparent hover:border-red-500"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
}
