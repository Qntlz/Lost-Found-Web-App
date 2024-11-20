"use client"

import { ArrowLeftIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { getDocs, collection, query } from "firebase/firestore";
import { Post } from "@/app/lib/definitions";
import { db, auth } from "@/firebaseConfig";
import { inter } from "@/app/ui/fonts";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function MyPost() {

    const [items, setItems] = useState<Post[]>([]); // State to store the items

    const fetchUserItems = async () => {
        const user = auth.currentUser;

        // Check if the user is authenticated
        if (!user) {
            alert("You need to be logged in to view your items.");
            return;
        }

        try {
            // Reference to the user's "items" collection
            const itemsRef = collection(db, "lostItems", user.uid, "submissions");

            // Query to fetch all items (you can also add filtering criteria)
            const q = query(itemsRef);

            // Get documents
            const querySnapshot = await getDocs(q);

            // Handle the documents returned from the query
            const storedItems = querySnapshot.docs.map(doc => ({
                id: doc.id,                                             // Get the document ID
                ...doc.data()                                           // Get the data from the document
            })) as Post[];

            setItems(storedItems);

            // Do something with the items
            console.log("User's items:", storedItems);
        } catch (error) {
            console.error("Error fetching items:", error);
            alert("Failed to fetch items.");
        }
    };

    // Use useEffect to fetch data when the component is mounted
    useEffect(() => {
        fetchUserItems();
    }, []); // Empty dependency array ensures this runs only once when the component mounts


    return (
        <div className={`${inter.className} mt-20 md:mt-[70px] grid grid-rows-1 lg:grid-cols-5 xl:grid-cols-12`}>
            <div>
                {/* Header */}
                <div className="flex flex-row justify-between mx-5 p-5 pl-0">
                    {/* Create Post */}
                    <div className="flex gap-2">
                        <div className="hidden w-5 pt-2 xl:block">
                            <Link href={'/home'}>
                                < ArrowLeftIcon />
                            </Link>
                        </div>
                        <span className="text-2xl font-normal text-red-500">My Posts</span>
                    </div>
                </div>

                {/* Retrieve & Diplay Post Information from Database */}
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="bg-white mx-7 rounded-lg mb-6">

                            {/* Post Section */}
                            <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4">
                                {/* Image */}
                                <div className="w-full lg:w-2/5 h-56 flex items-center justify-center">
                                    <Image
                                        src="/logo.svg"
                                        alt="Logo"
                                        width={0}
                                        height={0}
                                        style={{ width: 200, height: 'auto' }}
                                        className="transition-transform duration-300 ease-in-out hover:scale-110"
                                    />
                                </div>

                                {/* Post Details */}
                                <div className="flex-1 mt-4 lg:mt-0">
                                    <h3 className="font-bold text-lg">{item.itemName}</h3>
                                    <p className="font-medium">Status: <span className={clsx(
                                        {
                                            'text-red-500 font-normal': item.status === 'Missing',
                                            'text-green-500 font-normal': item.status === 'Found',
                                        }
                                    )}>
                                        {item.status} </span>
                                    </p>
                                    <p className="mt-2 font-medium">Campus:<span className="font-normal">{item.campus}</span></p>
                                    <p className="mt-2 font-medium">Building:<span className="font-normal">{item.building}</span></p>
                                    <p className="mt-2">{item.description}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap space-x-2 mt-4 font-medium gap-y-2">
                                        {item.tags.length > 0 ? (
                                            item.tags.map((tag, index) => (
                                                <span
                                                    key={`${tag}-${index}`}
                                                    className="px-3 py-1 outline outline-2 outline-red-500 rounded-full text-sm font-normal">
                                                    {tag}
                                                </span>
                                            ))
                                        ) : (
                                            <p>No tags</p>
                                        )}
                                    </div>
                                </div>

                                {/* Post Reactions */}
                                <div className="flex flex-col text-gray-500 font-light">
                                    <div className="mt-4 flex justify-end items-start md:flex-row lg:items-center ">
                                        <div className="flex items-center mb-2 lg:mb-0">
                                            <span className="mr-2">100 views</span>
                                        </div>
                                        <div className="flex items-center">
                                            <ArrowTrendingUpIcon className='h-6 w-6 mr-2' /> 100
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <span> {item.submittedAt?.toDate().toLocaleDateString()} {item.submittedAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </div>
        </div>
    );

}