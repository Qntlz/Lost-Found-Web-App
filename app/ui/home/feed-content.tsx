"use client";

import { useEffect } from "react";
import { userListProps, Post, user } from "@/app/lib/definitions";
import { db } from "@/firebaseConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Image from "next/image";
import clsx from "clsx";

export default function Posts({
    items, userList, selectedStatus, selectedCampus,
    selectedBuilding, showFilters, setUserList, setItems
}: userListProps) {

    // Fetch all user data from Firestore
    const fetchUserUIDs = async () => {
        try {
            const usersRef = collection(db, "users");
            const snapshot = await getDocs(usersRef);
            const users = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as user[]; // Ensure type matches

            setUserList(users); // Now works because types align
            //console.log("Fetched Users:", users);
        } catch (error) {
            console.error("Error fetching user UIDs:", error);
        }
    };

    // Fetch all items from Firestore with applied filters
    const fetchAllItems = async () => {
        
        try {
            const submissionsRef = collection(db, "allSubmissions");

            let q = query(submissionsRef, orderBy("submittedAt", "desc"));
            if (selectedStatus !== "All") {
                q = query(q, where("status", "==", selectedStatus));
            }
            if (selectedCampus !== "All") {
                q = query(q, where("campus", "==", selectedCampus));
            }
            if (selectedBuilding !== "All") {
                q = query(q, where("building", "==", selectedBuilding));
            }

            const querySnapshot = await getDocs(q);
            const storedItems = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Post[];

            setItems(storedItems);
            console.log("Fetched items:", storedItems);
        } catch (error) {
            console.error("Error fetching items:", error);
        }

    };

    useEffect(() => {
        fetchAllItems();
        fetchUserUIDs();
    }, [selectedStatus, selectedCampus, selectedBuilding]); // Refetch items on filter change

    return (
        <div className={`transition-all duration-300 ${showFilters ? "pt-12" : "pt-4"
            }`}>
            {/* Display Filtered and Searched Items */}
            {items.length > 0 ? (
                items.map((item) => (
                    <div key={item.id} className="bg-white mx-7 rounded-lg mb-6">
                        {/* Post Section */}
                        <div className="flex flex-col lg:flex-row">
                            {/* Image */}
                            <div className="w-full lg:w-2/5 h-56 flex items-center justify-center">
                                <Image
                                    src="/logo.svg"
                                    alt="Logo"
                                    width={0}
                                    height={0}
                                    style={{ width: 200, height: "auto" }}
                                    className="transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </div>

                            {/* Post Details */}
                            <div className="flex-1 mt-4 lg:mt-0">
                                <h3 className="font-bold text-lg">{item.itemName}</h3>
                                <p className="font-medium text-gray-500">
                                    {userList.find((user) => user.id === item.user)?.name || "Unknown User"}
                                </p>
                                <p className="font-medium mt-3">
                                    Status:{" "}
                                    <span
                                        className={clsx({
                                            "text-red-500 font-normal": item.status === "Missing",
                                            "text-green-500 font-normal": item.status === "Found",
                                        })}
                                    >
                                        {item.status}
                                    </span>
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
                                                className="px-3 py-1 outline outline-2 outline-red-500 rounded-full text-sm font-normal"
                                            >
                                                {tag}
                                            </span>
                                        ))
                                    ) : (
                                        <p>No tags</p>
                                    )}
                                </div>
                                {/* Post Date */}
                                <div className="text-gray-500 font-light">
                                    <div className="mt-4 flex justify-end items-start md:flex-row lg:items-center">                               
                                        <div>
                                            <span> {item.submittedAt?.toDate().toLocaleDateString()} {item.submittedAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))
            ) : (
                <p>No items found.</p>
            )}
        </div>
    );
}
