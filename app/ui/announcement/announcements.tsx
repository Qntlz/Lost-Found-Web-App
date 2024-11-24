"use client";

import Image from 'next/image';
import { inter } from '../fonts';
import { useEffect, useState } from 'react';

interface Announcement {
    id: number;
    title: string;
    content: string;
    author: {
        name: string;
        role: string;
        imageUrl: string;
    };
}

export default function Announcements(): JSX.Element {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        // Fetch announcements from the backend API
        const fetchAnnouncements = async (): Promise<void> => {
            try {
                const response = await fetch('/api/announcements'); // Adjust the API endpoint as necessary
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Announcement[] = await response.json();
                setAnnouncements(data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <div className="relative">
            <h2 className={`${inter.className} font-bold`}>Announcements</h2>
            <div className="mt-3 mx-3">
                {announcements.map((announcement) => (
                    <div key={announcement.id} className="flex items-center mb-4">
                        <Image
                            src={announcement.author.imageUrl || '/logo.svg'} // Fallback to default logo
                            alt={announcement.author.name}
                            width={100}
                            height={100}
                            className="h-12 w-12 rounded-full mr-4"
                        />
                        <div>
                            <h3 className="font-bold text-lg">{announcement.title}</h3>
                            <p className="text-sm text-gray-400">{announcement.author.role}</p>
                        </div>
                        <p className="mt-4 text-sm text-justify">{announcement.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}