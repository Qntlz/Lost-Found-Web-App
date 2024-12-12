"use client";

import { getDocs, collection, query, updateDoc, doc, getDoc } from "firebase/firestore";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { onAuthStateChanged } from "firebase/auth";
import { Post } from "@/app/lib/definitions";
import { db, auth } from "@/firebaseConfig";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function MyPost() {

    const [items, setItems] = useState<Post[]>([]); // State to store the items

    const fetchUserItems = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                alert("You need to be logged in to view your items.");
                return;
            }

            try {
                // Reference to the user's "items" collection
                const itemsRef = collection(db, "lostItems", user.uid, "submissions");

                // Query to fetch all items
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
        });
    };

    const markAsFound = async (itemId: string) => {
        const user = auth.currentUser;

        if (!user) {
            alert("You need to be logged in to mark an item.");
            return;
        }

        try {
            // Reference to the specific item document in lostItems
            const itemRef = doc(db, "lostItems", user.uid, "submissions", itemId);

            // Retrieve the "globalPostID" from the lostItems document
            const itemDoc = await getDoc(itemRef);
            if (!itemDoc.exists()) {
                alert("Item not found.");
                return;
            }

            const globalPostID = itemDoc.data().globalPostID;
            if (!globalPostID) {
                alert("GlobalPostID not found in the item.");
                return;
            }

            // Reference to the corresponding document in allSubmissions
            const globalItemRef = doc(db, "allSubmissions", globalPostID);

            // Update the item's status to "Found" in both collections
            await Promise.all([
                updateDoc(itemRef, { status: "Found" }),
                updateDoc(globalItemRef, { status: "Found" })
            ]);

            // Fetch updated items
            fetchUserItems();

            //alert("Item marked as found successfully!");
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update the item's status.");
        }
    };


    // Use useEffect to fetch data when the component is mounted
    useEffect(() => {
        fetchUserItems();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div>
            {/* Header */}
            <div className="flex flex-row justify-between mx-5 p-4 pl-0">
                <div className="flex gap-2">
                    <span className="text-2xl font-semibold text-red-500">My Posts</span>
                </div>
            </div>

            <div className="xl:w-[80%]">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="flex flex-col gap-3 mx-7 mb-6 md:flex-row">

                            {/* Item Image */}
                            <div className="basis-2/5">
                                {item.imageUrl ? (
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.itemName || "Item Image"}
                                        width={200}
                                        height={200}
                                        unoptimized
                                        priority
                                        style={{ width: 400, height: "100%" }}
                                        className="object-contain"
                                    />
                                ) : (
                                    <Image
                                        src="/logo.svg"
                                        alt={item.itemName || "Item Image"}
                                        width={200}
                                        height={200}
                                        style={{ width: 150, height: "100%" }}
                                    />
                                )}
                            </div>

                            {/* Item Information */}
                            <div className="basis-3/5">
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
                                                className="px-3 py-1 outline outline-1 outline-red-500 rounded-full text-sm font-normal">
                                                {tag}
                                            </span>
                                        ))
                                    ) : (
                                        <p>No tags</p>
                                    )}
                                </div>

                                {/* Post Date & Status */}
                                <div className="flex flex-col mt-4 justify-end items-end gap-2 font-light text-gray-500">
                                    <div>
                                        <span>
                                            {item.submittedAt?.toDate().toLocaleDateString()}{" "}
                                            {item.submittedAt?.toDate().toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                    <div>
                                        {/* Mark as Found Button */}
                                        {item.status === "Missing" && (
                                            <button
                                                onClick={() => markAsFound(item.id)}
                                                className="mt-1 bg-red-500 text-white px-3 py-1 rounded-md"
                                            >
                                                Mark as Found
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="">No Items Found</p>
                )}
            </div>

        </div >
    );
}
