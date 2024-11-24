"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { Post } from "@/app/lib/definitions";
import { db } from "@/firebaseConfig";
import { inter } from "../fonts";

export default function PostFeed() {
  const [items, setItems] = useState<Post[]>([]);
  const [userList, setUserList] = useState<{ id: string; name: string }[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCampus, setSelectedCampus] = useState("All");
  const [selectedBuilding, setSelectedBuilding] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all user data from Firestore
  const fetchUserUIDs = async () => {
    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as { id: string; name: string }[];
      setUserList(users);
      console.log("Fetched Users:", users);
    } catch (error) {
      console.error("Error fetching user UIDs:", error);
    }
  };

  // Fetch all items from Firestore with applied filters
  const fetchAllItems = async () => {
    try {
      const submissionsRef = collection(db, "allSubmissions");

      let q = query(submissionsRef);
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

  // Filter items based on search query
  const filterItemsBySearch = (items: Post[], searchQuery: string) => {
    if (!searchQuery) return items; // If no search query, return all items
    return items.filter((item) => {
      const searchString = `${item.itemName} ${item.description} ${item.status} ${item.campus} ${item.building} ${item.tags.join(' ')}`.toLowerCase();
      return searchString.includes(searchQuery.toLowerCase());
    });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchAllItems();
    fetchUserUIDs();
  }, [selectedStatus, selectedCampus, selectedBuilding]); // Refetch items on filter change

  const filteredItems = filterItemsBySearch(items, searchQuery);

  return (
    <div className="relative">
      <div className={`${inter.className} grid grid-rows-1 lg:grid-cols-5 xl:grid-cols-12`}>
        <div>
          {/* Filter Section */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex gap-2">
              <select onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus} className="p-2 border border-gray-300 rounded-md">
                <option value="All">All Status</option>
                <option value="Found">Found</option>
                <option value="Missing">Missing</option>
              </select>
              <select onChange={(e) => setSelectedCampus(e.target.value)} value={selectedCampus} className="p-2 border border-gray-300 rounded-md">
                <option value="All">All Campus</option>
                <option value="Talamban">Talamban</option>
                {/* Add more campuses as needed */}
              </select>
              <select onChange={(e) => setSelectedBuilding(e.target.value)} value={selectedBuilding} className="p-2 border border-gray-300 rounded-md">
                <option value="All">All Buildings</option>
                <option value="Bunzell">Bunzell</option>
                <option value="SAFAD">SAFAD</option>
                {/* Add more buildings as needed */}
              </select>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-5xl"> {/* Increased max width */}
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-[400px] p-2 border border-gray-300 rounded-md "
              />
            </div>
          </div>

          {/* Display Filtered and Searched Items */}
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
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
                    <p className="font-medium">
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
                  </div>

                  {/* Post Reactions */}
                  <div className="flex flex-col text-gray-500 font-light">
                    <div className="mt-4 flex justify-end items-start md:flex-row lg:items-center">
                      <div className="flex items-center mb-2 lg:mb-0">
                        <span className="mr-2">100 views</span>
                      </div>
                      <div className="flex items-center">
                        <ArrowTrendingUpIcon className="h-6 w-6 mr-2" /> 100
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <span>
                        {item.submittedAt?.toDate().toLocaleDateString()}{" "}
                        {item.submittedAt?.toDate().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
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
    </div>
  );
}
