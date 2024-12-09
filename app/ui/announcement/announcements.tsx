"use client";

import Image from 'next/image';
import { inter } from '../fonts';
import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig'; // Import Firestore configuration
import { Timestamp, collection, getDocs } from 'firebase/firestore';

interface Announcement {
    id: string; // Firestore document ID
    title: string;
    body: string;
    author: {
        name: string;
        role: string;
        imageUrl: string;
    };
    date_added: Timestamp; // Optional Timestamp field
}

export default function Announcements(): JSX.Element {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        // Fetch announcements from Firestore
        const fetchAnnouncements = async (): Promise<void> => {
            try {
                const querySnapshot = await getDocs(collection(db, 'allAnnouncement'));
                const announcementsData: Announcement[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Announcement[];
                setAnnouncements(announcementsData);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    // Function to format the Firestore Timestamp
    const formatDate = (timestamp?: Timestamp): string => {
        if (!timestamp) return 'No date available'; // Handle case where timestamp is undefined
        return timestamp.toDate().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="relative">
            <h2 className={`${inter.className} font-bold ml-5 text-xl`}>Announcements</h2>
            <div className="mt-3 mx-3">
                {announcements.map((announcement) => (
                    <div key={announcement.id} className="flex items-center mb-4">
                        {/* Uncomment if you want to display the author's image */}
                        {/* <Image
                            src={announcement.author.imageUrl || '/logo.svg'} // Fallback to default logo
                            alt={announcement.author.name}
                            width={100}
                            height={100}
                            className="h-12 w-12 rounded-full mr-4"
                        /> */}
                        <div>
                            <h3 className="font-bold text-lg">{announcement.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{formatDate(announcement.date_added)}</p>
                            <p className="mt-4 text-sm text-justify">{announcement.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}